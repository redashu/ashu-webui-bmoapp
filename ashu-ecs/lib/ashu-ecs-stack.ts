import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as ecs from  'aws-cdk-lib/aws-ecs'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AshuEcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this,'ashuExistingVpc', {
      vpcId: 'vpc-063afa0c24ec80cb8'
    });
    // defining ECS cluster info 
    const cluster = new ecs.Cluster(this,'ashu-ecs-cluster',{
      clusterName: 'ashu-ecs-bycdk', // change cluster name 
      vpc: vpc,
      enableFargateCapacityProviders: true ,
      containerInsights: true // enable cloudwatch monitoring 
    });
    // // add ec2 capacity 
    // cluster.addCapacity('defaultashuScaleGroup',{
    //   instanceType: new ec2.InstanceType("t2.small"),
    //   desiredCapacity: 1, // container instances
    //   minCapacity: 1,
    //   maxCapacity: 5
    // });

    // task Definition of farget launch type 
    const ashuTaskDef = new ecs.FargateTaskDefinition(this,'ashu-frg-task1',{
      cpu:  256,
      memoryLimitMiB: 512
       
    });
    // adding container info 
    const container = ashuTaskDef.addContainer('ashucdkc1',{
      image: ecs.ContainerImage.fromRegistry('dockerashu/ashubmo:nginxuiv1'),
      memoryLimitMiB: 256,
      portMappings: [{ containerPort: 80 }]
    });
  }
}
