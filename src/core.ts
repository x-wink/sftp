/* eslint-disable no-console */
import { Client } from 'ssh2';
import path from 'path';
import fs from 'fs';
const client = new Client();
const resolvePath = (...paths: string[]) => path.resolve(...[process.cwd(), ...paths]);
const linuxPath = (...paths: string[]) => path.join(...paths).replaceAll(path.sep, '/');
const exec = (command: string, debug = false) => {
    return new Promise<string[]>((resolve, reject) => {
        client.exec(command, (err, stream) => {
            if (err) {
                reject(err);
            } else {
                const data = [] as string[],
                    error = [] as string[];
                stream
                    .on('exit', (code: number, signal: string) => {
                        debug && console.info(`命令执行结束：${command}，退出码为：${code}，信号为：${signal}`);
                        if (code !== 0 || error.length) {
                            reject(error);
                        } else {
                            resolve(data);
                        }
                    })
                    .on('data', (buffer: ArrayBuffer) => {
                        const str = String(buffer);
                        debug && console.info('标准输出', str);
                        data.push(str);
                    })
                    .stderr.on('data', (buffer: ArrayBuffer) => {
                        const str = String(buffer);
                        debug && console.info('错误输出', str);
                        error.push(str);
                    });
            }
        });
    });
};
const scan = (dir: string, excludes: string[] = [], parent = '') => {
    const res = { dirs: [] as string[], files: [] as string[] };
    dir = path.resolve(parent, dir);
    if (excludes.includes(dir)) {
        console.info('已忽略：' + dir);
    } else {
        if (fs.existsSync(dir)) {
            if (fs.statSync(dir).isDirectory()) {
                if (dir.split(path.sep).some((name) => name.indexOf('.') !== -1)) {
                    console.info('跳过隐藏文件夹：' + dir);
                } else {
                    if (parent) {
                        res.dirs.push(dir);
                    }
                    const temp = fs.readdirSync(dir).flatMap((item) => scan(item, excludes, dir));
                    res.files.push(...temp.flatMap((item) => item.files));
                    res.dirs.push(...temp.flatMap((item) => item.dirs));
                }
            } else {
                res.files.push(dir);
            }
        } else {
            console.warn('目录或者文件不存在：' + dir);
        }
    }
    return res;
};
export interface SftpOption {
    excludes?: string[];
    flat?: boolean;
    clear?: boolean;
    override?: boolean;
    debug?: boolean;
    mode?: number;
}
const sftp = (local: string, remote: string, options?: SftpOption) => {
    let { excludes = [] } = options ?? {};
    const { flat = false, clear = false, override = false, debug = false, mode = 0o777 } = options ?? {};
    excludes = excludes.map((item) => resolvePath(local, item));
    local = resolvePath(local);
    return new Promise<void>((resolve, reject) => {
        client.sftp(async (err, sftp) => {
            if (err) {
                console.error(`SFTP开启失败：${local} => ${remote}`);
                reject(err);
            } else {
                debug && console.info(`SFTP开启成功：${local} => ${remote}`);
                debug && console.info('开始扫描待传输文件列表');
                const { dirs, files } = scan(local, excludes);
                debug && console.info('待传输文件数：' + files.length);
                // 如果本地文件超过一个、本地文件只有一个而且有后缀但是远程路径没有后缀，则把远程路径当做目录
                const remoteIsDir = files.length > 1 || (path.extname(files[0]) && !path.extname(remote));
                if (remoteIsDir && clear) {
                    await exec(`rm -rf ${remote}/*`);
                    debug && console.info('已清空远程文件夹');
                }
                if (!flat) {
                    debug && console.info('待创建文件夹数：' + dirs.length);
                    await Promise.all(
                        dirs.map(async (item) => {
                            item = linuxPath(remote, path.relative(local, item));
                            debug && console.info(`创建文件夹：${item}`);
                            await exec(`mkdir -p ${item}`);
                            debug && console.info(`创建成功：${item}`);
                        })
                    );
                }
                await Promise.all(
                    files.map(async (file) => {
                        let target = remote;
                        if (remoteIsDir) {
                            if (flat) {
                                target = `${target}/${path.basename(file)}`;
                            } else {
                                target = linuxPath(target, path.relative(local, file));
                            }
                        }
                        return new Promise<void>((resolve, reject) => {
                            debug && console.info(`开始传输：${file} => ${target}`);
                            const translate = () => {
                                sftp.fastPut(file, target, { mode }, (err) => {
                                    if (err) {
                                        reject(err);
                                        console.error(`传输失败：${file} => ${target}`);
                                    } else {
                                        debug && console.info(`传输成功：${file} => ${target}`);
                                        resolve();
                                    }
                                });
                            };
                            exec(`stat ${target}`)
                                .then(() => {
                                    if (override) {
                                        translate();
                                    } else {
                                        debug && console.info('文件已存在：' + target);
                                        resolve();
                                    }
                                })
                                .catch(translate);
                        });
                    })
                );
                resolve();
            }
        });
    });
};
export type RunOption = {
    connect?: Parameters<typeof client.connect>[0];
    local?: string;
    remote?: string;
    sftpOptions?: SftpOption;
    debug?: boolean;
    config?: string | false;
};
type ResolvedConfig = {
    [k in keyof Omit<RunOption, 'config'>]-?: RunOption[k];
};
const resolveConfig = (options?: RunOption) => {
    const { config = false } = options || {};
    let res = options as ResolvedConfig;
    if (config) {
        try {
            res = JSON.parse(String(fs.readFileSync(resolvePath(config)))) as ResolvedConfig;
        } catch (e) {
            console.error('解析配置文件失败', e);
        }
    }
    // TODO 支持秘钥登录
    if (
        !res.connect?.host ||
        !res.connect?.port ||
        !res.connect?.username ||
        !res.connect?.password ||
        !res.local ||
        !res.remote
    ) {
        throw new Error(
            '配置至少包含以下属性：connect.host、connect.port、connect.username、connect.password、local、remote'
        );
    }
    return res;
};
export const run = (options?: RunOption) => {
    const config = resolveConfig(options);
    const { connect, local, remote, sftpOptions, debug } = config;
    debug && console.info(config);
    client
        .on('ready', async () => {
            debug && console.info('连接成功');
            try {
                await sftp(local, remote, sftpOptions);
                console.info('文件传输完成');
            } catch (e) {
                console.error('执行异常', e);
            }
            client.end();
            client.destroy();
        })
        .on('error', (err) => {
            debug && console.info('发生异常：' + err);
        })
        .on('timeout', () => {
            debug && console.info('会话超时');
        })
        .on('close', () => {
            debug && console.info('连接关闭');
        })
        .connect(connect);
};
