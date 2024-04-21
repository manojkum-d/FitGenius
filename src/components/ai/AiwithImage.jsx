import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ImageIcon } from 'lucide-react';

const AiwithImage = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyCobw72pFKOeULAZWTBnV8srQxNgYopnkQ');

    const [image, setImage] = useState('');
    const [imageInlineData, setImageInlineData] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function aiImageRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const result = await model.generateContent([
                      `You are an expert in nutritionist where you need to see the food items from the image
            and calculate the total calories, also provide the details of every food items with calories intake
            is below format

            1. Item 1 - no of calories
            2. Item 2 - no of calories...
            
           
             and at the end get 2 line conclusion about this food item and shld i eat it or no
`, imageInlineData
        ]);
        const response = await result.response;
        const text = await response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleClick = () => {
        aiImageRun();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);

        fileToGenerativePart(file).then((image) => {
            setImageInlineData(image);
        });
    }

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(file);
        });

        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    }

    return (
      <div className="overflow-auto" style={{ maxHeight: '80vh' }}>
        <div className="max-w-md mx-auto mt-8 p-8 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">
                AI with Image
                <ImageIcon size="24" className="inline-block ml-2 " />
            </h2> 
            <div className="mb-4">
                <input type='file' onChange={(e) => handleImageChange(e)}  />
            </div>
            <div className="mb-4">
                {image ? (
                    <img src={image} alt="Uploaded Image" className="w-full h-auto" />
                ) : (
                    <div className="border border-gray-400 rounded-md h-64 flex justify-center items-center">
                        <span className="text-gray-400">No image selected</span>
                    </div>
                )}
            </div>
            <div className="mb-4">
                <button className="bg-gray-300 hover:bg-red-400 text-black font-bold py-2 px-4 rounded-lg" onClick={handleClick} disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {aiResponse && 
                    <div className="bg-gray-100 p-4 rounded">
                        <pre className="text-gray-800 whitespace-pre-wrap">{aiResponse}</pre>
                    </div>
                }
            </div>
        </div>
      </div>
  );
};

export default AiwithImage;
