import { Auth, StackContext, use } from "@serverless-stack/resources"
import * as iam from "aws-cdk-lib/aws-iam"
import { MainApi } from "./MainApi"
import { Storage } from "./Storage"


export function Auths({stack}: StackContext) {
    const {api} = use(MainApi)
    const bucket = use(Storage).react_bucket

    const auth = new Auth(
        stack, 'Auth', {
            login: ['username', 'email']
        }
    )

    auth.attachPermissionsForAuthUsers([api])

    stack.addOutputs({
        UserPoolId: auth.userPoolId,
        IdentityPoolId: auth.cognitoIdentityPoolId,
        UserPoolClientId: auth.userPoolClientId
    })

    return {
        auth
    }
}