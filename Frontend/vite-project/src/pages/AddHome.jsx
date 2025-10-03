import React, { useState, useEffect } from "react";
import { 
    MapPin, Tag, DollarSign, FileText, Upload, Users, Bed, Bath, 
    X, ArrowLeft, CheckCircle, XCircle
} from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";

// --- HELPER COMPONENTS ---
const InputWithIcon = ({ icon: Icon, label, name, type = "text", value, onChange, placeholder, min, step }) => (
    <div className="space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
            <Icon className="w-4 h-4 mr-2 text-red-500" />
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            step={step}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
                       transition duration-150"
        />
    </div>
);

const TextAreaWithIcon = ({ icon: Icon, label, name, value, onChange, placeholder }) => (
    <div className="space-y-1">
        <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center">
            <Icon className="w-4 h-4 mr-2 text-red-500" />
            {label}
        </label>
        <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows="4"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
                       transition duration-150 resize-none"
        ></textarea>
    </div>
);

function AddHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const isEditMode = query.get("isEdit") === "true";
    const homeId = query.get("homeId");

    const [formData, setFormData] = useState({
        location: "",
        title: "",
        pricePerNight: "",
        description: "",
        guests: 1,
        bedrooms: 1,
        bathrooms: 1,
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);

    // Load existing home data if editing
    useEffect(() => {
        if (isEditMode && homeId) {
            fetch(`http://localhost:5000/api/homes/${homeId}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        location: data.location || "",
                        title: data.title || "",
                        pricePerNight: data.pricePerNight || "",
                        description: data.description || "",
                        guests: data.guests || 1,
                        bedrooms: data.bedrooms || 1,
                        bathrooms: data.bathrooms || 1,
                    });
                    if (data.image) {
                        setImagePreview(`http://localhost:5000${data.image}`);
                    }
                })
                .catch(err => console.error("Failed to fetch home data:", err));
        }
    }, [isEditMode, homeId]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'number' ? Number(value) : value 
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(false);
        setIsError(false);

        try {
            if (!image && !isEditMode) {
                throw new Error("Image is required");
            }

            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (image) data.append("image", image);

            const url = isEditMode ? 
                `http://localhost:5000/api/homes/${homeId}` : 
                "http://localhost:5000/api/homes/add";
            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, { method, body: data });
            if (!res.ok) throw new Error("Failed to save home");

            setIsSubmitted(true);
            setIsError(false);
            navigate("/hostHomes");
        } catch (err) {
            console.error("❌ Submission failed:", err);
            setIsError(true);
        }
    };

    const handleCancel = () => {
        navigate("/host-home");
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <section className="bg-gradient-to-r from-red-600 to-red-800 pt-16 pb-20 sm:pt-20 sm:pb-24 shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                        {isEditMode ? "Edit Your Home" : "Add Your Home"} <span className="text-yellow-300">🏡</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-red-200 max-w-3xl mx-auto">
                        {isEditMode ? "Update your home details and save changes." : "Share your unique space with the world and start hosting today."}
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
                    {isSubmitted && (
                        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg shadow-inner flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <span className="font-semibold text-lg">🎉 Home saved successfully!</span>
                            </div>
                            <button onClick={() => setIsSubmitted(false)} className="text-green-500 hover:text-green-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                    {isError && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg shadow-inner flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <XCircle className="w-6 h-6 text-red-600" />
                                <span className="font-semibold text-lg">❌ Error saving home. Please check your inputs.</span>
                            </div>
                            <button onClick={() => setIsError(false)} className="text-red-500 hover:text-red-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputWithIcon icon={MapPin} label="Location Address" name="location" placeholder="e.g., 123 Pine St, Miami, FL" value={formData.location} onChange={handleChange} />
                            <InputWithIcon icon={Tag} label="Home Title / Short Name" name="title" placeholder="e.g., Sunny Beach Bungalow" value={formData.title} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <InputWithIcon icon={Users} label="Max Guests" name="guests" type="number" placeholder="Guests" value={formData.guests} onChange={handleChange} min="1" />
                            <InputWithIcon icon={Bed} label="Bedrooms" name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} min="1" />
                            <InputWithIcon icon={Bath} label="Bathrooms" name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} min="1" />
                            <InputWithIcon icon={DollarSign} label="Price per Night ($)" name="pricePerNight" type="number" placeholder="150" value={formData.pricePerNight} onChange={handleChange} min="1" step="any" />
                        </div>

                        <TextAreaWithIcon icon={FileText} label="Detailed Description" name="description" placeholder="Describe your home, its amenities, and nearby attractions." value={formData.description} onChange={handleChange} />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                                <Upload className="w-4 h-4 mr-2 text-red-500" /> Home Image {isEditMode ? "(Optional)" : "(Required)"}
                            </label>
                            {imagePreview && (
                                <div className="mb-4 relative w-40 h-40 rounded-lg overflow-hidden border-4 border-red-300 shadow-md">
                                    <img src={imagePreview} alt="Home Preview" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full text-xs shadow-lg hover:bg-red-700 transition">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <input type="file" name="image" accept="image/*" onChange={handleImageChange} required={!imagePreview && !isEditMode} className="w-full text-sm text-gray-500
                                           file:mr-4 file:py-2 file:px-4
                                           file:rounded-full file:border-0
                                           file:text-sm file:font-semibold
                                           file:bg-red-50 file:text-red-700
                                           hover:file:bg-red-100 transition duration-150" />
                            <p className="text-xs text-gray-400 mt-1">Upload a high-quality photo of your home.</p>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" onClick={handleCancel} className="px-6 py-3 rounded-full text-gray-600 font-bold border-2 border-gray-300 hover:bg-gray-100 transition duration-150 flex items-center space-x-2">
                                <ArrowLeft className="w-5 h-5" /> <span>Cancel</span>
                            </button>
                            <button type="submit" className="px-8 py-3 rounded-full text-white font-bold bg-red-600 shadow-lg shadow-red-500/50 hover:bg-red-700 active:bg-red-800 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-300">
                                {isEditMode ? "Update Home" : "Submit Home"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddHome;
