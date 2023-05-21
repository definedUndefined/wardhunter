import { fail } from 'assert'
import {
  LucideArrowDownAZ,
  LucideHeading1,
  LucideHeading2,
  LucideHighlighter,
  LucideList,
} from 'lucide-react'
import React, { DragEvent, useState } from 'react'

function article() {
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [counter, setCounter] = useState(1)

  const handleDragStart = (event: DragEvent<HTMLDivElement>, text: string) => {
    event.dataTransfer.setData('text/plain', text)

    if (selectedElements.includes(text)) {
      const updatedSelectedElements = selectedElements.filter(
        (element) => element !== text,
      )
      setSelectedElements(updatedSelectedElements)
    } else {
      const updatedSelectedElements = [...selectedElements, text]
      setSelectedElements(updatedSelectedElements)
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const text = event.dataTransfer.getData('text/plain')
    const updatedValue = textareaValue
      ? `${textareaValue}\n${text}\n`
      : `${text}\n`
    console.log(updatedValue)

    setTextareaValue(updatedValue)
    setDraggedElement(null)
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const addSeparator = () => {
    const selectedText = window.getSelection()?.toString();
  
    if (selectedText) {
      const startIndex = textareaValue.indexOf(selectedText);
      const endIndex = startIndex + selectedText.length;
  
      const updatedValue =
        textareaValue.substring(0, startIndex) +
        `**${selectedText}**` +
        textareaValue.substring(endIndex);
  
      setTextareaValue(updatedValue);
    }
  };
  
  

  const createList = () => {
    const lines = textareaValue.split('\n').filter(line => line.trim() !== '');
    const list = lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
    setTextareaValue(list);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)

    try {
      const response = await fetch('/api/create-md-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.get('name'),
          content: form.get('content'),
        }),
      })

      console.log(await response.json())

      if (!response.ok) {
        const data = await response.json()
        console.log(data)
      }
    } catch (error) {
      // Gérer les erreurs de connexion ou autres erreurs
    }
  }

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <div className="flex flex-col gap-2">
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, '#ST')}
                className=" px-4 py-4 text-center bg-white rounded-md"
              >
                <LucideArrowDownAZ />
              </div>
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, '=============== ')}
                className=" px-4 py-4 text-center bg-white rounded-md"
              >
                <LucideHeading1 />
              </div>
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, '---------------	')}
                className=" px-4 py-4 text-center bg-white rounded-md"
              >
                <LucideHeading2 />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form className="space-y-4"
            onSubmit={handleSubmit}
            >
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  name="name"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div>
                  <button
                    type="button"
                    onClick={addSeparator}
                    className="block w-full rounded-lg border border-gray-200 p-3 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  >
                    <LucideHighlighter />
                  </button>
                </div>

                <div>
                <div>
                  <button
                    type="button"
                    onClick={createList}
                    className="block w-full rounded-lg border border-gray-200 p-3 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  >
                    <LucideList />
                  </button>
                </div>
                </div>

                <div>
                  <input
                    className="peer sr-only"
                    id="option3"
                    type="radio"
                    tabIndex={-1}
                  />

                  <label
                    htmlFor="option3"
                    className="block w-full rounded-lg border border-gray-200 p-3 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                    tabIndex={0}
                  >
                    <span className="text-sm font-medium"> Option 3 </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>

                <textarea
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Message"
                  rows={8}
                  id="message"
                  name="content"
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default article
