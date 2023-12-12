export class ContactDto {
    label: string
    body: string
    href: string
    iconType: 'telegram' | 'email' | 'linkedIn' | 'instagram'
    atl?: string
}