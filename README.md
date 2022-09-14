# drools-scripts

> Scripts to build, deploy and test rules from Drools

- Data models are defined in `src/main/java/com/prospection/drools`
- Rules are defined in `src/main/resources/com/prospection/drools`

## Prerequisites

- Install Node.js (to run the scripts)
- Install Java and Maven (to compile the rules)
- Install KIE server at http://localhost:8080/kie-server

## Install dependencies

```
npm install
```

## Build rules to Maven

```
node scripts/build 1.0.0
```

## Deploy rules to KIE server

```
node scripts/deploy 1.0.0
```

## Test rules from KIE server

```
node scripts/test 1.0.0
```
