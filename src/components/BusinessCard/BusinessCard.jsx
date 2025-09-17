import html2canvas from "html2canvas";
import React, { useState, useRef, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaQrcode,
  FaSave,
  FaShareAlt,
} from "react-icons/fa";

const socialIconMap = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  whatsapp: FaWhatsapp,
};

const BusinessCard = ({ card }) => {
  const [shareError, setShareError] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const cardRef = useRef();

  if (!card) return null;

  useEffect(() => {
    console.log("Social links in card:", card.social);
  }, [card.social]);

  const avatar =
    card.logoUrl ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(card.name || "User") +
      "&background=6366f1&color=ffffff&size=256";

  const handleShare = async () => {
    setShareError("");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Business Card",
          text: `${card.name} - ${card.company}`,
          url: window.location.href,
        });
      } catch (err) {
        setShareError("Share cancelled or failed.");
      }
    } else {
      setShareError("Sharing is not supported in your browser.");
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    // Wait for images to load
    const images = Array.from(cardRef.current.querySelectorAll("img"));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((res) => {
          img.onload = res;
          img.onerror = res;
        });
      })
    );

    html2canvas(cardRef.current, {
      useCORS: true,
      backgroundColor: "#fff",
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "business_card.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleQRToggle = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowQR(!showQR);
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center py-8 px-4">
      <div className="relative perspective-1000">
        <div
          ref={cardRef}
          className={`w-96 bg-white shadow-2xl rounded-3xl p-8 transition-all duration-300 transform-style-preserve-3d ${
            isFlipping
              ? showQR
                ? "rotate-y-180"
                : "rotate-y-0"
              : showQR
              ? "rotate-y-180"
              : "rotate-y-0"
          }`}
          style={{
            minHeight: "580px",
            background: "#fff",
            borderRadius: "1.5rem",
            border: "1px solid rgba(0,0,0,0.05)",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease-in-out",
          }}
        >
          {/* Front Side */}
          <div
            className={`absolute inset-0 p-8 rounded-3xl backface-hidden ${
              showQR ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex flex-col items-center text-center h-full">
              {/* Profile Image (round, no ring or border) */}
              <div
                className="w-32 h-32 mb-6 shadow-lg"
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                }}
              >
                <img
                  src={avatar}
                  alt={card.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              {/* Name */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {card.name}
              </h2>
              {/* Position */}
              <p className="text-gray-600 text-lg mb-1">{card.position}</p>
              {/* Company */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {card.company}
              </h3>
              {/* Description */}
              {card.description && (
                <p className="text-gray-600 text-sm mb-6 leading-relaxed max-w-sm text-center">
                  {card.description}
                </p>
              )}
              {/* Contact Information */}
              <div className="w-full space-y-4 mb-8">
                {/* Email */}
                <div className="flex items-center justify-start gap-3 text-sm">
                  <span className="text-gray-500 font-medium min-w-16">
                    Email:
                  </span>
                  <a
                    href={`mailto:${card.email}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium truncate"
                  >
                    {card.email}
                  </a>
                </div>
                {/* Phone */}
                <div className="flex items-center justify-start gap-3 text-sm">
                  <span className="text-gray-500 font-medium min-w-16">
                    Phone:
                  </span>
                  <a
                    href={`tel:${card.phone}`}
                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                  >
                    {card.phone}
                  </a>
                </div>
                {/* Website */}
                {card.website && (
                  <div className="flex items-center justify-start gap-3 text-sm">
                    <span className="text-gray-500 font-medium min-w-16">
                      Website:
                    </span>
                    <a
                      href={
                        card.website?.startsWith("http")
                          ? card.website
                          : `https://${card.website}`
                      }
                      className="text-blue-600 hover:text-blue-700 transition-colors font-medium truncate"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {card.website?.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
              </div>
              {/* Action Buttons (Social Row, then QR/Save/Share Row) */}
              <div className="action-buttons flex flex-col items-center gap-4 mt-auto">
                {/* Social Media Icons */}
                <div className="flex justify-center items-center gap-4">
                  {card.social &&
                    Object.entries(card.social).map(([key, value]) => {
                      if (!value) return null;
                      const IconComponent = socialIconMap[key];
                      if (!IconComponent) return null;

                      let iconColor = "text-gray-600";
                      if (key === "facebook") iconColor = "text-blue-600";
                      if (key === "instagram") iconColor = "text-pink-600";
                      if (key === "linkedin") iconColor = "text-blue-700";
                      if (key === "whatsapp") iconColor = "text-green-600";

                      return (
                        <a
                          key={key}
                          href={
                            key === "whatsapp"
                              ? `https://wa.me/${value.replace(/\D/g, "")}`
                              : value
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 ${iconColor} border border-gray-100`}
                          aria-label={key}
                        >
                          <IconComponent size={20} />
                        </a>
                      );
                    })}
                </div>
                {/* Action Icons (QR, Save, Share) */}
                <div className="flex justify-center items-center gap-4">
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-gray-600 border border-gray-100"
                    aria-label="QR Code"
                    onClick={handleQRToggle}
                  >
                    <FaQrcode size={20} />
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-gray-600 border border-gray-100"
                    aria-label="Save Business Card"
                    onClick={handleDownload}
                  >
                    <FaSave size={20} />
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-gray-600 border border-gray-100"
                    aria-label="Share Business Card"
                    onClick={handleShare}
                  >
                    <FaShareAlt size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Back Side - QR Code */}
          <div
            className={`absolute inset-0 p-8 rounded-3xl transform rotate-y-180 backface-hidden ${
              showQR ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center h-full">
              <div
                className="w-20 h-20 mb-6 shadow-lg"
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                }}
              >
                <img
                  src={avatar}
                  alt={card.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {card.name}
              </h3>
              <p className="text-gray-600 mb-6">{card.company}</p>
              <div className="bg-white p-4 rounded-2xl shadow-inner mb-6">
                {card.qrCodeUrl ? (
                  <img
                    src={card.qrCodeUrl}
                    alt="QR Code"
                    className="w-48 h-48 mx-auto"
                  />
                ) : (
                  <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      <FaQrcode className="text-4xl mb-2 mx-auto" />
                      QR Code not available
                    </p>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-lg"
                onClick={handleQRToggle}
              >
                Back to Card
              </button>
            </div>
          </div>
        </div>
        {shareError && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-red-600 bg-white px-3 py-1 rounded-lg shadow-md">
            {shareError}
          </div>
        )}
      </div>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
};

export default BusinessCard;
