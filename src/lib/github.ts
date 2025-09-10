import {Octokit} from "octokit"
import "dotenv/config";



export const octokit = new Octokit({

auth : process.env.GITHUB_TOKEN 
})

const githubUrl = "https://github.com/Turab031/tcs.git"
type Response ={
    commitHash: string
    commitMessages: string
    commitAuthorName:string
    commitDate:string
}

export const getCommitHashes = async(githubUrl:string):Promise<Response[]>=>{

    const {data} = await octokit.rest.repos.listCommits({
        owner: "Turab031",
        repo: "tcs"
    })
    const sortedCommits = data.sort((a:any,b:any)=>new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()) as any[]
    return sortedCommits.slice(0,15).map((commit:any)=>({
        commitHash: commit.sha as string,
        commitMessages: commit.commit.message ??"",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitAuthorAvatar: commit?.author?.avatar_url ?? "",
        commitDate: commit.commit?.author.date ?? ""

    }))

}

console.log(await getCommitHashes(githubUrl))