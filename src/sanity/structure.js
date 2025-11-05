import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Site Settings as singleton
      S.listItem()
        .title('Site Settings')
        .id('settings')
        .icon(() => '⚙️')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Site Settings')
        ),
      // Divider
      S.divider(),
      // About page as singleton
      S.listItem()
        .title('About Page')
        .id('about')
        .icon(() => '📄')
        .child(
          S.document()
            .schemaType('about')
            .documentId('about')
            .title('About Page')
        ),
      // Contact page as singleton
      S.listItem()
        .title('Contact Page')
        .id('contact')
        .icon(() => '📄')
        .child(
          S.document()
            .schemaType('contact')
            .documentId('contact')
            .title('Contact Page')
        ),
      // Divider
      S.divider(),
      // Projects with drag and drop ordering
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        S,
        context,
      }),
      // Press items with drag and drop ordering
      orderableDocumentListDeskItem({
        type: 'press',
        title: 'Press',
        S,
        context,
      }),
      // Other document types (excluding the ones we've already handled)
      ...S.documentTypeListItems().filter(
        (listItem) => !['about', 'contact', 'settings', 'project', 'press'].includes(listItem.getId())
      ),
    ])
