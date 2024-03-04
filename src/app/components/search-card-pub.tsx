// create a react components that represents a search card
import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    Dialog,
    Input,
    Typography
} from "@material-tailwind/react";

const SearchCardPub: React.FC<any> = ({ document, index, setShowModal, setPaperAbstract }) => {
    const sourceMap: any = {
        'pubmed': 'PubMed',
        'wos': 'Web of Science',
        'emf': 'EMF-Portal'
    }

    const linkMap: any = {
        'pubmed': 'https://pubmed.ncbi.nlm.nih.gov/',
        'wos': 'https://www.webofscience.com/',
        'emf': 'https://emf-portal.org/'
    }

    return (
        <div className=' rounded-lg border-none p-0'>
            <Card placeholder={""} className="w-full mb-4 pt-6 hover:bg-[#eee]  bg-[#D9D9D9] object-cover object-center shadow-xl shadow-blue-gray-900/50">
                <div className='flex'>
                    <div className="float-left w-5/6">
                        <h3 className="ml-3 text-left mb-3 text-lg">{document.title}.</h3>
                        <p className="flex items-center mt-1">
                            <div className=" text-blue-500 ml-6">
                                {document.author?.map((auth: { given: string }, i: number) => {
                                    if (i < 5) return (<span className='p-0' key={i + " span " + index}>{auth.given}, </span>);
                                    else if (i == 5) return (<span className='p-0' key={i + " span " + index}>{auth.given} et al. </span>);
                                })}
                                - {document.publisher}, {document.created && document.created["date-time"] ? (new Date(document.created["date-time"])).getFullYear() : ' '}
                            </div>
                        </p>
                        <p className="flex items-center mb-2 -mt-4">
                            <div className="ml-6 text-gray-700 dark:text-gray-400">{document.subject ? document.subject.join(', ') : ''}</div>
                        </p>
                        <p className="flex items-center">
                            <div style={{ color: "#6359E1" }} className="ml-3 underline"><a href={document.URL}>{document.DOI}</a></div>
                        </p>
                    </div>
                    <div className="float-right w-1/6">
                        <div className="align-right flex flex-col">
                            <a href={linkMap[document.source]} target="_blank" className=''><div className="w-[8rem] text-sm mr-1 mb-4 mx-auto text-center bg-[#1d3f66] float-right p-3 rounded-lg text-gray-100 invisible lg:visible">📖 {sourceMap[document.source]}</div></a>
                            {document.abstract?.length ? (<a className='cursor-pointer' onClick={() => { setShowModal(true); setPaperAbstract(document.abstract); }} target="_blank"><div className="w-[8rem] text-center mx-auto text-sm mr-1 bg-[#1d3f66] float-right p-3 rounded-lg text-gray-100 invisible lg:visible">📄 Abstract</div></a>) : <></>}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SearchCardPub;