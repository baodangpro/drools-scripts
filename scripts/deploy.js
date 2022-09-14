const axios = require('axios')

const deployCli = async (argv) => {
  const [version] = argv

  await axios.put(`http://localhost:8080/kie-server/services/rest/server/containers/drools_example_${version}`, {
    'container-id': `drools_example_${version}`,
    'release-id': {
      'group-id': 'com.prospection',
      'artifact-id': 'drools_example',
      'version': version,
    },
  }, {
    auth: {
      username: 'kieserver',
      password: 'kieserver1!',
    },
  })
}

if (require.main === module) {
  deployCli(process.argv.slice(2)).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
