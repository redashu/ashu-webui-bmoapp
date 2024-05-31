import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as eks from 'aws-cdk-lib/aws-eks'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AshuEksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

     // pointing existing pvc 
     const vpc = ec2.Vpc.fromVpcAttributes(this,'ashuexistingVpc',{
      vpcId: 'vpc-063afa0c24ec80cb8',
      availabilityZones: ['us-east-1a','us-east-1b','us-east-1c'],
      publicSubnetIds: ['subnet-030435708c307f60c','subnet-0e1900e176370c252','subnet-0a3e4ba627e65ea53']
    });
    // creating IAM role for EKS cluster -- control plane 
    const ashuEKSadminRole = new iam.Role(this,'ashueksadmin',{
      assumedBy: new iam.AccountRootPrincipal()
      
    });
    // creating EKS cluster
    const cluster = new eks.Cluster(this,'ashu-eks-clustercdk',{
      vpc,
      version: eks.KubernetesVersion.V1_29,
      clusterName: 'ashueks-ckdcluster',
      mastersRole: ashuEKSadminRole,
      endpointAccess: eks.EndpointAccess.PUBLIC_AND_PRIVATE,
      defaultCapacityInstance: ec2.InstanceType.of(ec2.InstanceClass.T3,ec2.InstanceSize.MEDIUM),
      defaultCapacity: 1,
      vpcSubnets: [{ subnetType: ec2.SubnetType.PUBLIC}],
      securityGroup: ec2.SecurityGroup.fromSecurityGroupId(this,'default','sg-02875c19e327e6163')
      
    });
  }
}
