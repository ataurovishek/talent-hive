import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './menuBar'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'

export function JobDescriptionEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Typography,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),

        ],
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'min-h-[300px] p-4 max-w-none focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl'
            }
        }
    })

    return (
        <div className='w-full border border-lg overflow-hidden bg-card'>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}