import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const ExternalSources = ({ hasSubmitted, setHasSubmitted, inputState, setSearchResults, chosenSources, setChosenSources }: { hasSubmitted: boolean, setHasSubmitted:any, inputState: any, setSearchResults: any, chosenSources: any, setChosenSources: any }) => {

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
                        alert("No results found");
                    }
                } else {
                    console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        if (hasSubmitted) {
            if (chosenSources.length == 0) {
                alert("Please select at least one source");
                setHasSubmitted(false);
            }else
                submitSearch(inputState);
        }
    }, [hasSubmitted]);

    return (
        <div className='flex flex-row mx-auto w-full mt-10 mb-20'>
            <div className=' flex mx-auto items-center'>
                <button className={""} onClick={() => { chosenSources.includes("NextGEM") ? setChosenSources(chosenSources.filter(function(e: any) { return e !== 'NextGEM' })) : setChosenSources([...chosenSources, "NextGEM"]) }}>
                    <img width={100} src="./NextGEM_Button.svg" alt="NextGEM" className={chosenSources.includes("NextGEM") ? "custom-bounce chosen-source mr-[8px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[8px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button>
                {/* 
                <button className={""} onClick={() => { chosenSources.includes("CLUE-H") ? setChosenSources(chosenSources.filter(function(e) { return e !== 'CLUE-H' })) : setChosenSources([...chosenSources, "CLUE-H"]) }}>
                    <img width={100} src="./CLUE-H_Button.svg" alt="CLUE-H" className={chosenSources.includes("CLUE-H") ? " custom-bounce chosen-source mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button> */}

                <button className={""} onClick={() => { chosenSources.includes("EMF") ? setChosenSources(chosenSources.filter(function(e: any) { return e !== 'EMF' })) : setChosenSources([...chosenSources, "EMF"]) }}>
                    <img width={105} src="./EMF-portal_Button.svg" alt="EMF-Portal" className={chosenSources.includes("EMF") ? " custom-bounce chosen-source mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("Zenodo") ? setChosenSources(chosenSources.filter(function(e: any) { return e !== 'Zenodo' })) : setChosenSources([...chosenSources, "Zenodo"]) }}>
                    <img width={100} src="./Zenodo_Button.svg" alt="Zenodo" className={chosenSources.includes("Zenodo") ? " custom-bounce chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("PubMed") ? setChosenSources(chosenSources.filter(function(e: any) { return e !== 'PubMed' })) : setChosenSources([...chosenSources, "PubMed"]) }}>
                    <img width={105} src="./pubmed-logo.svg" alt="PubMed" className={chosenSources.includes("PubMed") ? " custom-bounce chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
                </button>

                <button className={""} onClick={() => { chosenSources.includes("WOS") ? setChosenSources(chosenSources.filter(function(e: any) { return e !== 'WOS' })) : setChosenSources([...chosenSources, "WOS"]) }}>
                    <img width={100} src="./wos-logo.svg" alt="WOS" className={chosenSources.includes("WOS") ? " custom-bounce chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
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
        </div>
    );
};

export default ExternalSources;
