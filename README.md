# amazon-elasticsearch-proxy

Sets up a proxy for signing requests with IAM credentials to access Amazon Elasticsearch. To build the docker image:

```shell
> make docker
```

## Installation

```shell
> npm install .
```

## Usage

Start the proxy with (make sure you have AWS Credentials loaded into your shell):

```shell
> ENDPOINT=endpoint USERNAME=username PASSWORD=hunter2 PORT=9200 BINDADDRESS=0.0.0.0 amazon-elasticsearch-proxy
```

You can also use the docker image like this:

```shell
> docker run -v ~/.aws:/root/.aws:ro -p 9200:9200 -e AWS_PROFILE=production -e ENDPOINT=endpoint -e USERNAME=username -e PASSWORD=hunter2 -e PORT=9200 -e BINDADDRESS=0.0.0.0 amazon-elasticsearch-proxy
```

An example would be that you have an ES domain in production environemnt which has access to an IAM role named `analytics` and this is the access policy 
for the domain:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111111111:role/analytics"
      },
      "Action": "es:*",
      "Resource": "arn:aws:es:us-east-1:11111111:domain/my-es-domain/*"
    }
  ]
}
```

And your `~/.aws/credentials` look like this:

```[production]
aws_access_key_id = YOUR-ACCESS-KEY-HERE
aws_secret_access_key = YOUR-SECRET-KEY-HERE

[analytics_profile]
role_arn = arn:aws:iam::111111111:role/analytics
source_profile = production
```

Then you can simply run this command:

```shell
> docker run -v ~/.aws:/root/.aws:ro -p 9200:9200 -e AWS_PROFILE=analytics_profile -e ENDPOINT=endpoint -e USERNAME=username -e PASSWORD=hunter2 -e PORT=9200 -e BINDADDRESS=0.0.0.0 amazon-elasticsearch-proxy
```

After that, the AWS SDK will pick up the `analytics_profile`, will use the credentials of `production` profile to assume the role `analytics` and requests would be 
signed for you. All you have to do is to use `localhost:9200` for all your operations.

