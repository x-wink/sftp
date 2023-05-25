import { Command } from 'commander';
import { version } from '../package.json';
const program = new Command();
program.version(version);
program.parse(process.argv);
program.option('-w --why', '自己写一个显得比较牛逼');
program.option(
    '-c --config',
    '指定配置文件路径，相对于本命令启动入口文件目录，一般是在package.json中启动，会覆盖命令行参数'
);
program.option('-h --connect-host', '远程服务器地址，必填');
program.option('-p --connect-port', '远程服务器端口，必填');
program.option('-u --connect-username', '远程服务器用户名，必填');
program.option('-p --connect-password', '远程服务器密码，必填');
program.option('-l --local', '本地地址，必填');
program.option('-r --remote', '远程地址，必填');
program.option('--debug', '输出调试日志，默认false');
program.option('-e --sftp-excludes', '要排除的本地目录，暂时只支持全字匹配，多个目录用英文逗号分隔，默认为空');
program.option('-f --sftp-flat', '是否扁平化目录（本地文件夹下任意深度的文件都直接传输到远程文件夹下），默认为false');
program.option('-c --sftp-clear', '是否在传输开始前清空远程文件夹，默认为false。慎用！删错了你别怪我！');
program.option('-o --sftp-override', '是否覆盖远程文件夹中已存在的文件，默认为false');
