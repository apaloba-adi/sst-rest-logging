import { ReactStaticSite, StackContext, use } from "@serverless-stack/resources";
import { MainApi } from "./MainApi";
import { Storage } from "./Storage";

export function SiteStack({stack} : StackContext) {
    const {api} = use(MainApi)
    const bucket = use(Storage).react_bucket

    const react_site = new ReactStaticSite(
        stack, 'Site',{
            path: 'react_site',
            environment: {
                REACT_APP_API_URL: api.url,
                REACT_APP_REGION: stack.region,
                REACT_APP_BUCKET: bucket.bucketName,
            }
        }
    )

    stack.addOutputs({
        SiteUrl: react_site.url
    })

    return {
        react_site
    }
}