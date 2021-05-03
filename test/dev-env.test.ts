import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DevEnv from '../lib/dev-env-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DevEnv.DevEnvStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
