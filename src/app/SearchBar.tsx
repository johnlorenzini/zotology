'use client'
import React, { useState } from 'react'

type Props = {}

const SearchBar = (props: Props) => {
	const [ query, setQuery ] = useState('');

  return (
    <div className="w-full flex justify-center">
        <input 
            type="text" 
            className="shadow-[0_0_24px_4px_rgba(203,213,225,.5)] max-w-4xl flex h-10 w-full rounded-full border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 z-10 bg-zinc-50"
            value={query}
						onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for courses, instructors or enter a 5-digit course code:"
        />
    </div>
  )
}

export default SearchBar