export class ProjectDto {
    name: string
    tags: Array<string>
    description: string
    link: string
    repoLink: string
    previewImage: string
    images?: Array<string>
    body?: string
}