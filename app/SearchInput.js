"use client"
import { data } from 'autoprefixer'
import { useState } from 'react'



export default function SearchInput({suggestions}){
    const suggestionsUse = suggestions
    const [inputString,setInputString] = useState('')
    const [suggestionsShow,setSuggestionsShow] = useState([])
    let suggestionsShowList = []
    function handleUpdate(e){
        let i = 0
        let count = 0
        let inputValueList = e.target.value.split(' ')
        while(count <= 5 && i <= suggestionsUse.length-1){
            // 空格分隔的最后部分默认为新输入部分
            if(suggestionsUse[i].includes(inputValueList.slice(-1))&&inputValueList.slice(-1) != ''){
                suggestionsShowList.push(<li><button onClick={() => addTagBySgt(suggestionsUse[i])}>{suggestionsUse[i]}</button></li>)
                count++
            }
            i++
        }
        setSuggestionsShow(suggestionsShowList)
        setInputString(e.target.value)
    }
    function addTagBySgt(suggestion){
        let inputValueStr = inputString.split(' ')
        let baseStr = inputValueStr.slice(1.-2).join(" ")
        baseStr = baseStr.concat(" $")
        baseStr = baseStr.concat(suggestion)
        console.log(baseStr)
    }
    return(
        <div>
            <div className='taginput'>
                <input value={inputString} onChange={e => handleUpdate(e)} />
                <ul>{suggestionsShow}</ul>
            </div>
            <button>搜索</button>
            
        </div>
    )
}

