import { useEffect, useState } from 'react';
import SearchCardPub from './search-card-pub';
import { Dropdown, Pagination } from 'flowbite-react';
import EntryModal from './helpers/EntryModal';
import SearchCardZenodo from './search-card-zenodo';
import { Menu, Transition } from "@headlessui/react";

import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
const SimpleSpinner = () => {
    return (
        <div role="status">
            <svg aria-hidden="true" className="mx-auto mt-40 w-[120px] h-[120px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
}

const SearchResultsTable: React.FC<any> = ({ submittedQuery, type, setCurrentPage, currentPage, setSearchQuery, setSubmittedQuery }) => {
    const [searchResults, setSearchResults] = React.useState<any>([]);
    const [active, setActive] = React.useState(1);
    const [showModal, setShowModal] = React.useState(false);
    const [paperAbstract, setPaperAbstract] = React.useState('');
    const [dataFiles, setDataFiles] = React.useState([]);
    const [sourcesToggled, setSourcesToggled] = useState<String[]>(["pubmed", "emf", "wos"]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filteredResults, setFilteredResults] = useState<any>([]);
    const [searchMode, setSearchMode] = useState<string>('Publications');

    const onPageChange = (page: number) => setCurrentPage(page);
    const openTagRe = /<([a-z]+)(?![^>]*\/>)[^>]*>/g;

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };
    async function search() {
        if (submittedQuery.length === 0) return;
        setIsLoading(true);

        if (searchMode === 'Publications') {
            const res = await fetch('/api/search/publications', {
                method: 'POST',
                body: JSON.stringify({ query: submittedQuery, type: type }),
            });
            const results = await res.json();
            setIsLoading(false);
            setSearchResults(results);
        } else {
            const res = await fetch('/api/search/zenodo', {
                method: 'POST',
                body: JSON.stringify({ query: submittedQuery, type: type }),
            });
            const results = await res.json();
            setIsLoading(false);
            setSearchResults(results);
        }
    }

    useEffect(() => {
        search();
    }, [submittedQuery, type]);

    useEffect(() => {
        if (searchMode === 'Zenodo') setFilteredResults(searchResults);
        else setFilteredResults(searchResults.filter((el: any) => sourcesToggled.includes(el.source.toLowerCase())));
    }, [sourcesToggled, searchResults]);

    useEffect(() => {
        const close = (e: any) => {
            if (e.keyCode === 27) {
                setShowModal(false);
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, []);

    return (
        <div className='h-full w-4/5 mx-auto'>
            <div className='mt-2 -ml-12 search-mode'>
                <Menu as="div" className="relative flex-none text-left w-[150px]">
                    <div>
                        <Menu.Button id="dropdown-button" data-dropdown-toggle="dropdown" className=" w-[150px]  h-[35px] flex-shrink-0 z-10 inline-flex items-center ml-4">
                            <ChevronDownIcon className='-mr-1' height={16} ></ChevronDownIcon>{searchMode}
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 z-10 ml-2 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 divide-y">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            onClick={() => { setSearchMode('Publications'); setSearchResults([]); setFilteredResults([]); setSearchQuery(""); setSubmittedQuery(""); }}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900 dark:bg-gray-100' : 'text-gray-700 dark:text-white',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            Publications
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            onClick={() => { setSearchMode('Zenodo'); setSearchResults([]); setFilteredResults([]); setSearchQuery(""); setSubmittedQuery(""); setSourcesToggled([]); }}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900 dark:bg-gray-100' : 'text-gray-700 dark:text-white',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            Zenodo
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <div className="mt-6">
                <div className='mx-auto'>
                    {submittedQuery.length && !isLoading ? (
                        <div className="flex items-left mb-3 -ml-3">
                            <h1 className="text-xl font-semibold mb-6">{filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found</h1>
                            {searchMode === "Publications" && (
                                <>
                                    <label htmlFor="toggle1" className=" items-center cursor-pointer ml-12 mb-5 mr-4 hidden lg:flex">
                                        <span className='mr-3 font-bold'>PubMed</span>
                                        <div className="relative">
                                            <input type="checkbox" onChange={() => sourcesToggled.includes("pubmed") ? setSourcesToggled(sourcesToggled.filter((el) => el != "pubmed")) : setSourcesToggled([...sourcesToggled, "pubmed"])} checked={sourcesToggled.includes("pubmed")} id="toggle1" className="sr-only" />
                                            <div className="block bg-gray-600 w-14 h-8 -ml-[10px] rounded-xl"></div>
                                            <div className={`dot absolute left-1 top-1 ${sourcesToggled.includes("pubmed") ? 'bg-blue-500' : 'bg-white'} w-6 h-6 rounded-xl transition ${sourcesToggled.includes("pubmed") ? 'transform translate-x-full' : ''}`}></div>
                                        </div>
                                    </label>
                                    <label htmlFor="toggle2" className="items-center cursor-pointer ml-2 mb-5 hidden lg:flex">
                                        <span className='mr-3 font-bold'>Emf Portal</span>
                                        <div className="relative">
                                            <input type="checkbox" onChange={() => sourcesToggled.includes("emf") ? setSourcesToggled(sourcesToggled.filter((el) => el != "emf")) : setSourcesToggled([...sourcesToggled, "emf"])} checked={sourcesToggled.includes("emf")} id="toggle2" className="sr-only" />
                                            <div className="block bg-gray-600 w-14 h-8 rounded-xl -ml-[10px]"></div>
                                            <div className={`dot absolute left-1 top-1 ${sourcesToggled.includes("emf") ? 'bg-blue-500' : 'bg-white'} w-6 h-6 rounded-full transition ${sourcesToggled.includes("emf") ? 'transform translate-x-full' : ''}`}></div>
                                        </div>
                                    </label>
                                    <label htmlFor="toggle3" className="items-center cursor-pointer ml-6 mb-5 hidden lg:flex">
                                        <span className='mr-3 font-bold'>Web of Science</span>
                                        <div className="relative">
                                            <input onChange={() => sourcesToggled.includes("wos") ? setSourcesToggled(sourcesToggled.filter((el) => el != "wos")) : setSourcesToggled([...sourcesToggled, "wos"])} checked={sourcesToggled.includes("wos")} type="checkbox" id="toggle3" className="sr-only" />
                                            <div className="block bg-gray-600 w-14 h-8 -ml-[10px] rounded-xl"></div>
                                            <div className={`dot absolute left-1 top-1 ${sourcesToggled.includes("wos") ? 'bg-blue-500' : 'bg-white'} w-6 h-6 rounded-xl transition ${sourcesToggled.includes("wos") ? 'transform translate-x-full' : ''}`}></div>
                                        </div>
                                    </label>
                                </>
                            )}
                        </div>
                    ) : <></>}
                </div>
                <div className="">
                    <div className="flex flex-col">
                        <div className="-my-2 flex-1 sm:-mx-6 lg:-mx-8 rounded-xl">
                            <div className=" align-middle rounded inline-block w-full ">
                                <div >
                                    {submittedQuery.length && !isLoading ? (
                                        filteredResults.slice((currentPage - 1) * 10, currentPage * 10).map((document: any, index: number) => searchMode === "Publications" ? (
                                            <SearchCardPub setShowModal={setShowModal} setPaperAbstract={setPaperAbstract} document={document} key={index}></SearchCardPub>
                                        ) : (
                                            <SearchCardZenodo setShowModal={setShowModal} setPaperAbstract={setPaperAbstract} setDataFiles={setDataFiles} document={document} key={index}></SearchCardZenodo>
                                        ))
                                    ) : <></>}
                                    {
                                        submittedQuery.length && isLoading ? (
                                            <SimpleSpinner />
                                        ) : <></>
                                    }
                                </div>
                                {submittedQuery.length && !isLoading ? (
                                    <div className="pagination w-4/5 mx-auto mb-7 text-center flex flex-col mt-4">
                                        {filteredResults.length > 10 ? (
                                            <Pagination
                                                color='primary'
                                                className='text-xl p-2'
                                                currentPage={currentPage}
                                                onPageChange={page => { setCurrentPage(page) }}
                                                totalPages={Math.floor(filteredResults.length / 10) + 1}
                                            />) : <></>}
                                    </div>) : <></>}
                            </div>
                        </div>
                    </div>
                </div>
                <EntryModal showModal={showModal} setShowModal={setShowModal} paperAbstract={paperAbstract} dataFiles={dataFiles} />
            </div>
        </div>
    );
};

export default SearchResultsTable;


