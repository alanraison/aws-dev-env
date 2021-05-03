import { Artifact } from '@aws-cdk/aws-codepipeline';
import { Stack, Construct, StackProps, SecretValue} from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from '@aws-cdk/pipelines';
import { GitHubSourceAction } from '@aws-cdk/aws-codepipeline-actions';
import { StringParameter } from '@aws-cdk/aws-ssm';

/**
 * Create a pipeline to create a Development Environment Image.
 * 
 * Expects the following parameters in ParameterStore:
 * 
 * * ** /devStack/repoOwner** - The GitHub account of the source repo
 * * ** /devStack/repo** - The GitHub repo containing the source
 * 
 * Also expects the following secret in SecretsManager:
 * * **githubToken** - The OAuth token to allow CodePipeline to authenticate with GitHub
 */
export class DevEnvStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact = new Artifact();
    const oauthToken = SecretValue.secretsManager('githubToken');

    new CdkPipeline(this, 'Deployment', {
      cloudAssemblyArtifact,
      sourceAction: new GitHubSourceAction({
        actionName: 'Source',
        output: sourceArtifact,
        oauthToken: oauthToken,
        owner: StringParameter.valueForStringParameter(this, '/devEnv/repoOwner'),
        repo: StringParameter.valueForStringParameter(this, '/devEnv/repo'),
        branch: 'main',
      }),
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
      })
    });
  }
}
