import { Test, TestingModule } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Content, PageContent } from './content.model';
import { ContentDto } from './dto/content.dto';

describe('AppController', () => {
    let contentController: ContentController;
    let contentService: ContentService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ContentController],
            providers: [ContentService],
        }).compile();

        contentController = app.get<ContentController>(ContentController);
        contentService = app.get<ContentService>(ContentService);
    });

    describe('root', () => {
        it('controller should be defined', () => {
            expect(contentController).toBeDefined();
        });

        it('service should be defined', () => {
            expect(contentService).toBeDefined();
        });
    });

    describe('getContent', () => {
        const pagesContent: Array<PageContent> = [
            {
                _id: '78ea8123-5d6d-4792-b86d-61b8169ab83e',
                type: 'about',
                ua: { _id: '1112', title: 'Тестування' },
                eng: { _id: '1113', title: 'Testing' }
            }
        ];

        const content: Content = { _id: 'cba7bd93-7cc7-4d3a-8239-49855458e54b', title: 'Testing' };

        it('method should return an array of content', () => {
            jest.spyOn(contentService, 'getPagesContent').mockImplementation(() => pagesContent);
            expect(contentController.getPagesContent()).toBe<PageContent[]>(pagesContent);
        });

        it('method should return an content object', () => {
            jest.spyOn(contentService, 'getContent').mockImplementation(() => content);
            expect(contentController.getContent({ type: 'about', lang: 'eng' })).toBe<Content>(content);
        });
    });

    describe('addPageContent', () => {
        const result: PageContent =
        {
            _id: '78ea8123-5d6d-4792-b86d-61b8169ab83e',
            type: 'about',
            ua: { _id: '1112', title: 'Тестування' },
            eng: { _id: '1113', title: 'Testing' }
        };

        it('method should return an created page content', () => {
            jest.spyOn(contentService, 'addPageContent').mockImplementation(() => result);
            expect(contentController.createPageContent(result)).toBe(result);
        });

    });

    describe('updateContent', () => {
        const result = '';

        const dto: ContentDto =
        {
            title: 'Test dto object',
            body: 'lorem'
        };

        it('method should return an created page content', () => {
            jest.spyOn(contentService, 'updateContent').mockImplementation(() => result);
            expect(contentController.updateContent({ type: 'about', lang: 'eng' }, dto)).toBe('');
        });

    });

    describe('deletePageContent', () => {
        const result = 'about';

        it('method should return an created page content', () => {
            jest.spyOn(contentService, 'deletePageContent').mockImplementation(() => result);
            expect(contentController.deletePageContent('about')).toBe(result);
        });

    });
});
