import '@aws-cdk/assert/jest'
import { MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DevEnv from '../lib/dev-env-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    const stack = new DevEnv.DevEnvStack(app, 'MyTestStack');

    expect(stack).toHaveResource('AWS::CodePipeline::Pipeline');
});
