enum ProjectTags {
    SCSS = 'SCSS',
    JS = 'JavaScript',
    TS = 'TypeScript',
    REACT = 'React',
    NEST_JS = 'NestJS',
    NEXT_JS = 'Next.js'
}

export class ProjectModel {
    _id: string
    name: string
    tags: Array<ProjectTags>
    description: string
    link: string
    repoLink: string
    previewImage: string
    images?: Array<string>
    body?: string
}
