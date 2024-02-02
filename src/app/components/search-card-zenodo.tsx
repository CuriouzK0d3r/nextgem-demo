import React from 'react';
import { Card } from 'flowbite-react';
import * as cheerio from 'cheerio';

const SearchCardZenodo: React.FC<any> = ({ document, index, setShowModal, setPaperAbstract, setDataFiles }) => {
    return (
        <div style={{ borderColor: "#6359E1" }} className='border-t rounded-lg'>
            <Card className="w-full mb-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                <div className='flex'>
                    <div className="float-left w-5/6">
                        <h3 className="ml-3 mb-3 text-lg">{document.title}</h3>
                        <div className="flex items-center mt-1">
                            <div className=" text-blue-500 ml-3">
                                {document.creators?.map((creator: any, i: number) => {
                                    if (i < 5) return (<span key={i + " span " + index}>{creator.name}, </span>);
                                    else if (i == 5) return (<span key={i + " span " + index}>{creator.name} et al. </span>);
                                })}, {document.publication_date}
                            </div>
                        </div>
                        <div className="flex items-center mt-1">
                            <div className="ml-3 text-gray-700 dark:text-gray-400">{cheerio.load(document.description, { xmlMode: true })?.text()}

                            </div>
                        </div>
                        <div className="flex items-center mt-1">
                            <div style={{ color: "#6359E1" }} className="ml-3 underline"><a href={document.URL}>{document.DOI}</a></div>
                        </div>
                    </div>
                    <div className="float-right w-1/6">
                        <div className="align-right">
                        <a href="https://zenodo.org/" target="_blank"><div className="w-[8rem] text-sm mr-1 text-center  mb-4 mx-auto bg-blue-500 float-right p-3 rounded-lg text-gray-100 invisible lg:visible">📖 Zenodo</div></a>
                        <a className="cursor-pointer" onClick={() => { setShowModal(true); setPaperAbstract(''); setDataFiles(document.files); }}><div className="w-[8rem] text-center mx-auto text-sm mr-1 bg-blue-500 float-right p-3 rounded-lg text-gray-100 invisible lg:visible">📁 Files</div></a>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SearchCardZenodo;