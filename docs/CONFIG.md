# Serverless Configuration

This document serves as a basic outline for configuring your Azure Function App through `serverless.yml`

## Function Runtime

### Operating System:

#### Supported Operating Systems:
- `windows`
- `linux`

#### How to specify operating system:
```yaml
...
provider:
  os: linux
...
```
Default is `windows`. Any `python` runtime will be automatically switched to `linux`.

### Language

#### Supported Runtimes:
- `nodejs8`
- `nodejs10`
- `nodejs12`
- `python3.6`
- `python3.7`
- `python3.8`

#### How to specify language:

```yaml
...
provider:
  runtime: nodejs10
...
```