import React from 'react';
import '../App.css'

export default function SearchBox ({ searchCriteria, search, setSearch }) {
    return (
        <div>
            <input 
                placeholder={searchCriteria}
                value={search}
                type='search'
                onChange={e => {setSearch(e.target.value.toLowerCase())}}
            />
            <script>console.log(search.target.value)</script>
        </div>
    );
}