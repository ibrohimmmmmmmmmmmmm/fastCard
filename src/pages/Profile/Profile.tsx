import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosRequest } from "../../utils/axios";
import { toast } from "sonner";

export default function Profile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosRequest.get("/UserProfile/get-user-profiles");
        // API response might be nested, checking different common patterns
        const data = Array.isArray(response.data?.data) ? response.data.data[0] : response.data?.data || response.data;
        if (data) {
          setFormData(prev => ({
            ...prev,
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
            address: data.address || data.streetAddress || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching profile", error);
        toast.error("Failed to load profile data");
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        ...(formData.newPassword ? {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        } : {})
      };
      
      // Changed to use the specific URL path provided by user
      await axiosRequest.put("/UserProfile/update-user-profile", payload);
      toast.success("Profile updated successfully!");
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="text-sm text-gray-500 mb-10">
        <Link to="/home" className="hover:text-black">Home</Link> <span className="mx-2">/</span> <span className="text-black font-medium">My Account</span>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Manage My Account</h3>
            <ul className="flex flex-col gap-2 pl-4">
              <li><Link to="/profile" className="text-red-500 font-medium">My Profile</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900 transition-colors">Address Book</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900 transition-colors">My Payment Options</Link></li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">My Orders</h3>
            <ul className="flex flex-col gap-2 pl-4">
              <li><Link to="#" className="text-gray-500 hover:text-gray-900 transition-colors">My Returns</Link></li>
              <li><Link to="#" className="text-gray-500 hover:text-gray-900 transition-colors">My Cancellations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3">My WishList</h3>
          </div>
        </div>

        {/* Profile Form */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8 lg:p-10">
          <h2 className="text-xl font-medium text-red-500 mb-8">Edit Your Profile</h2>

          {fetching ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Email address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">Street address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-gray-900 font-medium mb-4">Password Changes</h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white transition-colors"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white transition-colors"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-red-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-6 pt-6">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: ""
                    }))
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
