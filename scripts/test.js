const axios = require('axios')
const jsonStringify = require('json-stringify-pretty-compact')

const config = {
  MINIMUM_PROCESSORS: 2,
}

const servers = [
  { processors: 2, memory: 2048, disk_space: 4096 },
  { processors: 1, memory: 2048, disk_space: 4096 },
  { processors: 2, memory: 1024, disk_space: 4096 },
  { processors: 2, memory: 2048, disk_space: 2048 },
]

const testCli = async (argv) => {
  const [version] = argv

  const { data } = await axios.post(`http://localhost:8080/kie-server/services/rest/server/containers/instances/drools_example_${version}`, {
    lookup: 'stateless',
    commands: [
      {
        insert: {
          object: {
            'com.prospection.drools.Rule1Config': config,
          },
        },
      },
      ...servers.map((server, index) => ({
        insert: {
          'out-identifier': `fact-${index}`,
          object: {
            'com.prospection.drools.Rule1Fact': { ...server, result: {} },
          },
        },
      })),
      {
        'fire-all-rules': {
          'out-identifier': 'firedActivations',
        },
      },
    ],
  }, {
    auth: {
      username: 'kieserver',
      password: 'kieserver1!',
    },
  })

  const results = []

  for (const fact of data.result['execution-results'].results) {
    if (fact.key.startsWith('fact-')) {
      const result = {}

      result.index = +fact.key.split('-')[1]
      result.data = Object.values(fact.value)[0]

      results.push(result)
    }
  }

  results.sort((a, b) => a.index - b.index)

  console.log(jsonStringify(results.map(({ data }) => data)))
}

if (require.main === module) {
  testCli(process.argv.slice(2)).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
