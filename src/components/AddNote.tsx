// ----------------------------------------------------------
// File: AddNote.tsx
// Author: Máximo Martín Moreno
// Description: This file defines the AddNote component,
// which allows users to add, display, and delete notes.
// It utilizes React state management to handle the note list.
// ----------------------------------------------------------

'use client' // Ensures this file is treated as a client-side component

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Component to add and manage notes
export function AddNote() {
  const [notes, setNotes] = useState<string[]>([])   // State to store the list of notes
  const [newNote, setNewNote] = useState<string>('') // State to store the current input for a new note

  // Function to add a new note to the list
  const handleAddNote = () => {
    if (newNote.trim()) { // Check if the input is not empty or just spaces
      setNotes((prevNotes) => [...prevNotes, newNote]) // Append the new note
      setNewNote('') // Clear the input field
    }
  }

  // Function to delete a note from the list
  const handleDeleteNote = (note: string) => {
    setNotes((prevNotes) => prevNotes.filter((n) => n !== note)) // Remove the selected note
  }

  return (
    <Card className="bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-white">Add a Note</CardTitle> {/* Component title */}
      </CardHeader>
      <CardContent>
        {/* Input field for writing a new note */}
        <div className="mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)} // Update state on input change
            placeholder="Write your note here..."
            className="w-full p-2 rounded-md bg-zinc-800 text-white"
          />
        </div>

        {/* Button to add a new note */}
        <Button onClick={handleAddNote} className="w-full bg-orange-500 hover:bg-orange-600">
          Add Note
        </Button>

        {/* Display the list of added notes */}
        <div className="mt-4">
          <h3 className="text-white">Your Notes:</h3>
          <ul className="text-zinc-400">
            {notes.map((note, index) => (
              <li key={index} className="border-b border-zinc-700 py-2 flex justify-between items-center">
                <span>{note}</span>
                {/* Button to delete a note */}
                <Button
                  onClick={() => handleDeleteNote(note)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
