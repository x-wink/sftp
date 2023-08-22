#! /usr/bin/env node
import { Command } from 'commander';
import { name, version, description } from '../package.json';
import { RunOption, SftpOption, run } from './core';
const program = new Command();
program.name(name).version(version).description(description);

program
    .option(
        '-c --config <path>',
        '指定配置文件路径，相对于本命令启动入口文件目录，一般是在package.json中启动，会覆盖命令行参数'
    )
    .option('-l --local <local>', '本地路径')
    .option('-r --remote <remote>', '远程路径')
    .option('-h --connect-host <host>', '远程服务器地址，必填')
    .option('-p --connect-port <port>', '远程服务器端口，必填')
    .option('-u --connect-username <user>', '远程服务器用户名，必填')
    .option('-pwd --connect-password <pwd>', '远程服务器密码，必填')
    .option('--debug', '输出调试日志，默认false')
    .option('-e --sftp-excludes <paths>', '要排除的本地目录，暂时只支持全字匹配，多个目录用英文逗号分隔，默认为空')
    .option('-f --sftp-flat', '是否扁平化目录（本地文件夹下任意深度的文件都直接传输到远程文件夹下），默认为false')
    .option('-cls --sftp-clear', '是否在传输开始前清空远程文件夹，默认为false。慎用！删错了你别怪我！')
    .option('-o --sftp-override', '是否覆盖远程文件夹中已存在的文件，默认为false')
    .option('-i --sftp-ignoreHidden', '是否忽略隐藏文件夹，默认为true')
    .option('-m --sftp-mode <mode>', '远程文件mode，默认为0o777')
    .action((options: Record<string, unknown>) => {
        const config = {
            local: options.local,
            remote: options.remote,
            config: options.config,
            debug: options.debug,
            connect: {
                host: options.connectHost,
                port: options.connectPort,
                username: options.connectUsername,
                password: options.connectPassword,
            },
            sftpOptions: {
                excludes: (options.sftpExcludes as string | undefined)?.split(','),
                flat: options.sftpFlat,
                clear: options.sftpClear,
                override: options.sftpOverride,
                ignoreHidden: options.sftpIgnoreHidden,
                mode: options.sftpMode,
                debug: options.debug,
            } as SftpOption,
        } as RunOption;
        run(config);
    });

program.parse();
