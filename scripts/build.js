const path = require('path')

const del = require('del')
const spawn = require('cross-spawn')

const buildCli = async (argv) => {
  const [version] = argv

  await del(path.join(__dirname, '../target'), { force: true })

  await new Promise((resolve, reject) => {
    const spawnOptions = {
      stdio: ['pipe', process.stdout, process.stderr],
    }

    spawn('mvn', ['install', `-Dversion=${version}`], spawnOptions).on('close', resolve).on('error', reject)
  })
}

if (require.main === module) {
  buildCli(process.argv.slice(2)).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
