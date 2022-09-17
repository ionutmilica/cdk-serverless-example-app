import { Construct } from 'constructs';
import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Code, Function, IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';

import { CommonStackProps } from '../../cdk/common/types';

type SampleBlogAppProps = CommonStackProps & {};

const serviceName = 'sample-blog-app';
const lambdaName = 'sample-blog-api';
const apiName = 'sample-blog-api';

export class SampleExpressAppStack extends Stack {
  constructor(scope: Construct, id: string, props: SampleBlogAppProps) {
    super(scope, id, props);

    const handler = this.buildLambdaHandler(props);
    this.buildApiGateway(props, handler);
  }

  buildApiGateway(props: SampleBlogAppProps, handler: IFunction): void {
    const api = new LambdaRestApi(this, `${apiName}-gateway`, {
      restApiName: `${props.project}-${props.currentRegion}-${props.currentRegion}-${apiName}`,
      handler,
    });
  }

  buildLambdaHandler(props: SampleBlogAppProps): IFunction {
    return new Function(this, lambdaName, {
      functionName: `${props.project}-${props.currentRegion}-${props.currentEnv}-${lambdaName}`,
      description: ``,
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(`${serviceName}/apps/lambdas/${lambdaName}/build`),
      handler: 'lambda.handler',
      timeout: Duration.seconds(20),
      memorySize: 128,
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      environment: {
        PROJECT: props.project,
        CURRENT_REGION: props.currentRegion,
        CURRENT_ENV: props.currentEnv,
        NODE_OPTIONS: '--enable-source-maps',
      },
    });
  }
}
