
"use client"

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';

export function JsonToHtml({ json }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Typography,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),

        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert'
            }
        },
        editable: false,
        content: json
    })
    return <EditorContent editor={editor} />
}