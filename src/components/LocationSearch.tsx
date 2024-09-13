import type { Place } from "../api/Place";
import { search } from "../api/Search";
import { useState, Fragment } from 'react'


interface LocationSearchProps {
    onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
    const [places, setPlaces] = useState<Place[]>([])
    const [term , setTerm] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const results = await search(term)
        setPlaces(results)
    }

    return <div>
            <form onSubmit={handleSubmit}>
                <label className="font-bold" htmlFor="term">
                    Search
                </label>
            <input 
                type="text" 
                placeholder="Enter a location" 
                className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full"
                id='term'
                value={term}
                onChange={(e) => setTerm(e.target.value)}/>
            </form>
            <div>
                {
                    places.map(place => {
                        return (
                            <Fragment key={place.id}>
                                <p className="text-sm">{place.name}</p>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => onPlaceClick(place)}
                                >
                                    Go
                                </button>
                                <div className="border-b w-full col-span-2" />
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>  
}