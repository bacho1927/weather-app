import React from "react"
import { useState } from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import { BsFillDropletFill } from 'react-icons/bs'


function Search() {
    const [search, setSearch] = useState('')

    const [weather, setWeather] = useState({})

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=85f3a949d01bda6104336006ee55a732`


    const searchPressed = () => {
        fetch(api)
            .then((result) => result.json())
            .then((res) => {
                setWeather(res);
            })
            .catch(err => alert("please enter correct city name"))
    }

    let today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


    return (
        <>

            <div className=" h-[100vh] flex flex-col items-center justify-center m-auto  ">
                <div className="container  min-w-[250px] flex justify-center  relative w-1/2 ">
                    <AiOutlineSearch className="absolute top-5 left-3 " />
                    <input className="h-14 px-8 w-full rounded-md focus:border-transparent" id="input" type="text" placeholder="Enter City" onChange={(e) => setSearch(e.target.value)} />
                    <button className="absolute top-1 right-1 h-[50px] w-[110px] bg-blue-800 text-white rounded-lg hover:bg-blue-600" type="submit" id="submit" onClick={searchPressed}>Search</button>
                </div>
                {typeof weather.main !== 'undefined' ?
                    <div className="container  overflow-hidden flex justify-center pt-20">
                        <div className=" bg-white p-4 w-1/3 rounded-md min-w-fit">
                            <div className="flex justify-between w-96 mb-11 items-center w-full">
                                <h1 className="text-3xl font-medium text-gray-700 font-Courier" id="cityName">{weather.name}</h1>
                                <h2 id="time" className=" font-bold text-gray-500" >{date}</h2>
                            </div>
                            <div className="flex justify-center flex-col items-center mt-7 mb-11">
                                <h1 id="temp" className="text-[55px] text-[#2b304d] font-bold">{Math.round(weather.main.temp)}℃</h1>
                                <p className="text-[90%] font-normal text-gray-400">{weather.weather[0].main}</p>
                            </div>

                            <h1 className="flex text-gray-400 font-bold text-[100%]"><BsFillDropletFill className="mt-1" />{weather.main.humidity}%</h1>

                        </div>
                    </div> : (<p className=" text-white text-2xl py-5">Please type city to get data...</p>)}
            </div>


        </>
    )
}

export default Search
