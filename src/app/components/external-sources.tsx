import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ErrorModal from './helpers/ErrorModal';

const ExternalSources = ({ hasSubmitted, setHasSubmitted, inputState, setSearchResults, chosenSources, setChosenSources }: { hasSubmitted: boolean, setHasSubmitted: any, inputState: any, setSearchResults: any, chosenSources: any, setChosenSources: any }) => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const submitSearch = (formData: any) => {
        const apiEndpoint = "/api/search";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                formData: formData,
                chosenSources: chosenSources
            }),
        })
            .then(async (response) => {
                if (response.ok) {
                    const repJSON = await response.json();
                    setSearchResults(repJSON.searchResults);
                    setHasSubmitted(false);
                    if (repJSON.searchResults.length == 0) {
                        // alert("No results found");
                        setErrorMessage("No results found!");
                        setOpen(true);
                    }
                    // if (hasHistory)
                    //     await fetch("/api/history", {
                    //         method: "POST",
                    //         headers: {
                    //             "Content-Type": "application/json",
                    //         },
                    //         body: JSON.stringify({
                    //             formData: formData,
                    //             chosenSources: chosenSources,
                    //             username:
                    //         }),
                    //     });
                } else {
                    console.error("Search failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        if (hasSubmitted) {
            if (chosenSources.length == 0) {
                setErrorMessage("Please select at least one source!");
                setOpen(true);
                setHasSubmitted(false);
            } else
                submitSearch(inputState);
        }
    }, [hasSubmitted]);

    return (
        <div className='flex flex-col mx-auto w-full mt-10 mb-20'>
            <h1 className='text-xl text-black italic decoration-offset-4 decoration-wavy block text-center'>Select one or more sources:</h1> <br />

            <div className=' grid grid-cols-2 gap-x-2 lg:gap-0 lg:grid-cols-5 gap-y-2 mx-auto mt-4 items-center'>
                <button className={""} onClick={() => { chosenSources.length === 6 ? setChosenSources([]) : setChosenSources(["EMF", "NextGEM", "Zenodo", "PubMed", "WOS", "SEAWave"]) }}>
                    <img width={110} src="./allsources.svg" alt="NextGEM" className={"mr-[18px] p-0 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"} />
                </button>
            

                {/* 
                <button className={""} onClick={() => { chosenSources.includes("CLUE-H") ? setChosenSources(chosenSources.filter(function(e) { return e !== 'CLUE-H' })) : setChosenSources([...chosenSources, "CLUE-H"]) }}>
                    <img width={100} src="./CLUE-H_Button.svg" alt="CLUE-H" className={chosenSources.includes("CLUE-H") ? " custom-bounce chosen-source mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button> */}
                <button className={""} onClick={() => { chosenSources.includes("EMF") ? setChosenSources(chosenSources.filter(function (e: any) { return e !== 'EMF' })) : setChosenSources([...chosenSources, "EMF"]) }}>
                    <img width={105} src="./EMF-portal_Button.svg" alt="EMF-Portal" className={chosenSources.includes("EMF") ? " custom-bounce chosen-source mr-[12px] p-0 rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900" : "custom-bounce-hover mr-[12px] p-0 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("Zenodo") ? setChosenSources(chosenSources.filter(function (e: any) { return e !== 'Zenodo' })) : setChosenSources([...chosenSources, "Zenodo"]) }}>
                    <img width={100} src="./Zenodo_Button.svg" alt="Zenodo" className={chosenSources.includes("Zenodo") ? " custom-bounce chosen-source mr-[12px] p-0 rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900" : "custom-bounce-hover mr-[12px] p-0 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("PubMed") ? setChosenSources(chosenSources.filter(function (e: any) { return e !== 'PubMed' })) : setChosenSources([...chosenSources, "PubMed"]) }}>
                    <img width={105} src="./pubmed-logo.svg" alt="PubMed" className={chosenSources.includes("PubMed") ? " custom-bounce chosen-source mr-[12px] p-0 rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900" : "custom-bounce-hover mr-[12px] p-0 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("WOS") ? setChosenSources(chosenSources.filter(function (e: any) { return e !== 'WOS' })) : setChosenSources([...chosenSources, "WOS"]) }}>
                    <img width={100} src="./wos-logo.svg" alt="WOS" className={chosenSources.includes("WOS") ? " custom-bounce chosen-source mr-[12px] p-0 rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900" : "custom-bounce-hover mr-[12px] p-0 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"} />
                </button>
                
                <div></div>
                
                <button className={""} onClick={() => { chosenSources.includes("NextGEM") ? setChosenSources(chosenSources.filter(function (e: any) { return e !== 'NextGEM' })) : setChosenSources([...chosenSources, "NextGEM"]) }}>
                    <img width={100} src="./NextGEM_Button.svg" alt="NextGEM" className={chosenSources.includes("NextGEM") ? "custom-bounce chosen-source mr-[13px] p-0 rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900 mt-4" : "mt-6 custom-bounce-hover mr-[13px] p-0 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("SEAWave") ? setChosenSources(chosenSources.filter(function (e: any) { return e !== 'SEAWave' })) : setChosenSources([...chosenSources, "SEAWave"]) }}>
                    <img width={100} src="./seawave.svg" alt="SEAWave" className={chosenSources.includes("SEAWave") ? "custom-bounce chosen-source mr-[13px] p-0 rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900 mt-4" : "mt-6 custom-bounce-hover mr-[13px] p-0 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50"} />
                </button>
                {/* 
                <button className={""} onClick={() => { chosenSources.includes("EHDS") ? setChosenSources(chosenSources.filter(function(e) { return e !== 'EHDS' })) : setChosenSources([...chosenSources, "EHDS"]) }}>
                    <img width={100} src="./EHDS_Button.svg" alt="EHDS" className={chosenSources.includes("EHDS") ? " custom-bounce chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("Dataverse") ? setChosenSources(chosenSources.filter(function(e) { return e !== 'Dataverse' })) : setChosenSources([...chosenSources, "Dataverse"]) }}>
                    <img width={105} src="./Dataverse.svg" alt="Dataverse" className={chosenSources.includes("Dataverse") ? " custom-bounce chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("Yoda") ? setChosenSources(chosenSources.filter(function(e) { return e !== 'Yoda' })) : setChosenSources([...chosenSources, "Yoda"]) }}>
                    <img width={100} src="./YODA.svg" alt="Yoda" className={chosenSources.includes("Yoda") ? " chosen-source p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button> */}
            </div>

            <ErrorModal errorMessage={errorMessage} showModal={open} setShowModal={setOpen} ></ErrorModal>
        </div>
    );
};

export default ExternalSources;
