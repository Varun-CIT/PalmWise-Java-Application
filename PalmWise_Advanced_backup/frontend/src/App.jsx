import { useEffect, useState } from "react";
import "./App.css";
const assistanceImage = "https://images.pexels.com/photos/8192185/pexels-photo-8192185.jpeg?auto=compress&dpr=1&w=1600";
import facebookIcon from "./assets/crops/facebook.svg";
import xIcon from "./assets/crops/x.svg";
import youtubeIcon from "./assets/crops/youtube.svg";
import farmHeroImage from "./assets/farm-hero-clean.png";

function App() {
    const [page, setPage] = useState("officer");
    const [farmerSection, setFarmerSection] = useState("overview");
    const [officerSection, setOfficerSection] = useState("dashboard");
    const [language, setLanguage] = useState(
        () => localStorage.getItem("palmwiseLanguage") || "English"
    );
    const [officerDetail, setOfficerDetail] = useState(null);
    const [outreachFilter, setOutreachFilter] = useState("PENDING");
    const [submissionMessage, setSubmissionMessage] = useState(null);
    const [commentDrafts, setCommentDrafts] = useState({});

    // English -> Tamil UI translation.
    // IMPORTANT: render-time text can come from the database, so the translator
    // also handles dynamic scheme names, benefits, statuses and demo names.
    const tamilTranslations = {
        "Government Farmer Assistance Platform": "அரசு விவசாயி உதவி தளம்",
        "ADVANCED": "மேம்பட்டது",
        "Officer Dashboard": "அதிகாரி டாஷ்போர்டு",
        "Farmer Portal": "விவசாயி தளம்",
        "Officer Portal": "அதிகாரி தளம்",
        "Officer": "அதிகாரி",
        "Farmer": "விவசாயி",
        "Logout": "வெளியேறு",
        "Language": "மொழி",
        "English": "ஆங்கிலம்",
        "Tamil": "தமிழ்",
        "Sign out": "வெளியேறு",
        "OFFICER SERVICES": "அதிகாரி சேவைகள்",
        "FARMER SERVICES": "விவசாயி சேவைகள்",
        "Dashboard": "டாஷ்போர்டு",
        "Outreach Tasks": "வெளிப்பணி பணிகள்",
        "Government Scheme Management": "அரசுத் திட்ட மேலாண்மை",
        "Farmers Applications": "விவசாயி விண்ணப்பங்கள்",
        "Farmer Applications": "விவசாயி விண்ணப்பங்கள்",
        "Government Schemes": "அரசுத் திட்டங்கள்",
        "My Profile": "என் சுயவிவரம்",
        "Eligible Schemes": "தகுதியான திட்டங்கள்",
        "My Applications": "என் விண்ணப்பங்கள்",
        "Support / Assistance": "ஆதரவு / உதவி",
        "Support & Assistance": "ஆதரவு மற்றும் உதவி",
        "Farmer Overview": "விவசாயி மேலோட்டம்",
        "Eligible Government Schemes": "தகுதியான அரசு திட்டங்கள்",
        "Overall Status": "ஒட்டுமொத்த நிலை",
        "Farmers": "விவசாயிகள்",
        "Pending Calls": "நிலுவை அழைப்புகள்",
        "Completed Calls": "முடிக்கப்பட்ட அழைப்புகள்",
        "Registered farmers": "பதிவு செய்யப்பட்ட விவசாயிகள்",
        "Available government schemes": "கிடைக்கும் அரசு திட்டங்கள்",
        "Calls awaiting action": "நடவடிக்கைக்காக காத்திருக்கும் அழைப்புகள்",
        "Calls completed": "முடிக்கப்பட்ட அழைப்புகள்",
        "Click any number to view the corresponding details.": "தொடர்புடைய விவரங்களைப் பார்க்க எந்த எண்ணையும் தேர்ந்தெடுக்கவும்.",
        "Close": "மூடு",
        "Refresh": "புதுப்பி",
        "Contact Farmer": "விவசாயியை தொடர்புகொள்",
        "Complete Call": "அழைப்பை முடி",
        "Loading outreach tasks...": "வெளிப்பணி பணிகள் ஏற்றப்படுகின்றன...",
        "No outreach tasks available.": "வெளிப்பணி பணிகள் எதுவும் இல்லை.",
        "Farmer Name": "விவசாயியின் பெயர்",
        "Farmer name": "விவசாயியின் பெயர்",
        "Farmer:": "விவசாயி:",
        "Scheme Name": "திட்டத்தின் பெயர்",
        "Scheme:": "திட்டம்:",
        "Scheme Names": "திட்டப் பெயர்கள்",
        "scheme names": "திட்டப் பெயர்கள்",
        "Status": "நிலை",
        "Notes": "குறிப்புகள்",
        "Officer Comment": "அதிகாரியின் கருத்து",
        "Reason for Rejection": "நிராகரிப்பிற்கான காரணம்",
        "Under Review": "மதிப்பாய்வில்",
        "UNDER REVIEW": "மதிப்பாய்வில்",
        "Approve": "ஒப்புதல்",
        "Reject": "நிராகரி",
        "Review farmer applications and update their processing status.": "விவசாயி விண்ணப்பங்களை மதிப்பாய்வு செய்து செயலாக்க நிலையைப் புதுப்பிக்கவும்.",
        "Review each farmer application and record a decision comment.": "ஒவ்வொரு விவசாயி விண்ணப்பத்தையும் மதிப்பாய்வு செய்து முடிவு கருத்தைப் பதிவு செய்யவும்.",
        "Enter the reason or decision comment. Required for approval or rejection.": "காரணம் அல்லது முடிவு கருத்தை உள்ளிடவும். ஒப்புதல் அல்லது நிராகரிப்புக்கு இது அவசியம்.",
        "Application Submitted": "விண்ணப்பம் சமர்ப்பிக்கப்பட்டது",
        "Application Already Submitted": "விண்ணப்பம் ஏற்கனவே சமர்ப்பிக்கப்பட்டது",
        "Application Submitted Successfully": "விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
        "Application ID": "விண்ணப்ப எண்",
        "Application Tracking": "விண்ணப்ப கண்காணிப்பு",
        "APPLICATION TRACKING": "விண்ணப்ப கண்காணிப்பு",
        "Follow the progress of every government scheme application.": "ஒவ்வொரு அரசு திட்ட விண்ணப்பத்தின் முன்னேற்றத்தையும் கண்காணிக்கவும்.",
        "Your application for": "உங்கள் விண்ணப்பம்",
        "has been submitted successfully.": "வெற்றிகரமாக சமர்ப்பிக்கப்பட்டுள்ளது.",
        "You have already submitted an application for": "நீங்கள் ஏற்கனவே விண்ணப்பித்துள்ளீர்கள்:",
        "is already in your applications.": "இது உங்கள் விண்ணப்பங்களில் ஏற்கனவே உள்ளது.",
        "Already Submitted": "ஏற்கனவே சமர்ப்பிக்கப்பட்டது",
        "Apply now": "இப்போது விண்ணப்பிக்கவும்",
        "Submitting...": "சமர்ப்பிக்கப்படுகிறது...",
        "View eligibility": "தகுதியைப் பார்க்கவும்",
        "Checking...": "சரிபார்க்கப்படுகிறது...",
        "Eligible": "தகுதியானது",
        "ELIGIBLE": "தகுதியானது",
        "Decision": "முடிவு",
        "Rejected": "நிராகரிக்கப்பட்டது",
        "REJECTED": "நிராகரிக்கப்பட்டது",
        "rejected": "நிராகரிக்கப்பட்டது",
        "Approved": "ஒப்புதல் வழங்கப்பட்டது",
        "APPROVED": "ஒப்புதல் வழங்கப்பட்டது",
        "PENDING": "நிலுவையில்",
        "COMPLETED": "முடிக்கப்பட்டது",
        "CONTACTED": "தொடர்பு கொள்ளப்பட்டது",
        "Application Update": "விண்ணப்பப் புதுப்பிப்பு",
        "Application update": "விண்ணப்பப் புதுப்பிப்பு",
        "Application has been rejected": "விண்ணப்பம் நிராகரிக்கப்பட்டுள்ளது",
        "Application has been rejected.": "விண்ணப்பம் நிராகரிக்கப்பட்டுள்ளது.",
        "Application is currently under review.": "விண்ணப்பம் தற்போது மதிப்பாய்வில் உள்ளது.",
        "Application has been approved.": "விண்ணப்பம் ஒப்புதல் வழங்கப்பட்டுள்ளது.",
        "Application submitted successfully.": "விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது.",
        "Application submitted successfully": "விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது",
        "This application has already been approved or rejected and cannot be changed again.": "இந்த விண்ணப்பம் ஏற்கனவே ஒப்புதல் அல்லது நிராகரிப்பு செய்யப்பட்டதால் மீண்டும் மாற்ற முடியாது.",
        "Please enter an officer comment before approving or rejecting the application.": "விண்ணப்பத்தை ஒப்புதல் அல்லது நிராகரிப்பதற்கு முன் அதிகாரியின் கருத்தை உள்ளிடவும்.",
        "No pending farmer applications available.": "நிலுவையில் உள்ள விவசாயி விண்ணப்பங்கள் எதுவும் இல்லை.",

        // Farmer home/profile labels.
        "WELCOME BACK": "மீண்டும் வரவேற்கிறோம்",
        "Welcome back": "மீண்டும் வரவேற்கிறோம்",
        "Your Farm": "உங்கள் பண்ணை",
        "Your farm": "உங்கள் பண்ணை",
        "your farm": "உங்கள் பண்ணை",
        "Your Farm Dashboard": "உங்கள் பண்ணை டாஷ்போர்டு",
        "Manage your farm profile": "உங்கள் பண்ணை சுயவிவரத்தை நிர்வகிக்கவும்",
        "Manage your farm profile, discover eligible government schemes and monitor applications from one place.": "உங்கள் பண்ணை சுயவிவரத்தை நிர்வகிக்கவும், தகுதியான அரசு திட்டங்களைப் பார்த்து, விண்ணப்பங்களை ஒரே இடத்தில் கண்காணிக்கவும்.",
        "Explore schemes": "திட்டங்களைப் பார்க்கவும்",
        "View profile": "சுயவிவரத்தைப் பார்க்கவும்",
        "SCHEMES": "திட்டங்கள்",
        "Schemes": "திட்டங்கள்",
        "schemes": "திட்டங்கள்",
        "MY APPLICATIONS": "என் விண்ணப்பங்கள்",
        "My Applications": "என் விண்ணப்பங்கள்",
        "Review the information associated with your farmer account.": "உங்கள் விவசாயி கணக்குடன் தொடர்புடைய தகவல்களைப் பரிசீலிக்கவும்.",
        "Review the information associated with account": "கணக்குடன் தொடர்புடைய தகவல்களைப் பரிசீலிக்கவும்",
        "Full Name": "முழுப் பெயர்",
        "Full name": "முழுப் பெயர்",
        "Account Username": "கணக்கு பயனர்பெயர்",
        "Preferred Language": "விருப்ப மொழி",
        "Preferred": "விருப்பமான",
        "preferred": "விருப்பமான",
        "Primary": "முதன்மை",
        "primary": "முதன்மை",
        "Primary Crop": "முதன்மை பயிர்",
        "Location": "இடம்",
        "State": "மாநிலம்",
        "Crop": "பயிர்",
        "Land Area": "நில அளவு",
        "Land": "நிலம்",
        "land": "நிலம்",
        "Acre": "ஏக்கர்",
        "acre": "ஏக்கர்",
        "Acres": "ஏக்கர்",
        "acres": "ஏக்கர்",
        "Tamil Nadu": "தமிழ்நாடு",
        "TamilNadu": "தமிழ்நாடு",
        "Chennai": "சென்னை",
        "Arun Kumar": "அருண் குமார்",
        "Rajesh Kumar": "ராஜேஷ் குமார்",
        "Varun": "வருண்",
        "Rice": "நெல்",
        "rice": "நெல்",

        // Officer portal.
        "Secure Officer Portal": "பாதுகாப்பான அதிகாரி தளம்",
        "Secure Portal": "பாதுகாப்பான தளம்",
        "Secure portal": "பாதுகாப்பான தளம்",
        "secure portal": "பாதுகாப்பான தளம்",
        "Secure": "பாதுகாப்பான",
        "Portal": "தளம்",
        "portal": "தளம்",
        "Government Administration": "அரசு நிர்வாகம்",
        "Government programmes matched to your farm profile.": "உங்கள் பண்ணை சுயவிவரத்துடன் பொருந்தும் அரசு திட்டங்கள்.",
        "Government programmes matched to your farm profile": "உங்கள் பண்ணை சுயவிவரத்துடன் பொருந்தும் அரசு திட்டங்கள்",
        "Manage government schemes available in the PalmWise platform.": "PalmWise தளத்தில் கிடைக்கும் அரசு திட்டங்களை நிர்வகிக்கவும்.",
        "Manage government schemes": "அரசுத் திட்டங்களை நிர்வகிக்கவும்",
        "available in the": "கிடைக்கின்ற",
        "PalmWise platform.": "PalmWise தளத்தில்.",
        "Find guidance and assistance for using PalmWise.": "PalmWise பயன்படுத்துவதற்கான வழிகாட்டுதலையும் உதவியையும் பெறுங்கள்.",
        "Close Form": "படிவத்தை மூடு",
        "Add Scheme": "திட்டத்தைச் சேர்க்கவும்",
        "Save Scheme": "திட்டத்தைச் சேமிக்கவும்",
        "Delete": "நீக்கு",
        "No schemes found.": "திட்டங்கள் எதுவும் இல்லை.",
        "Manage": "நிர்வகிக்கவும்",
        "Review": "மதிப்பாய்வு",
        "Track every application from submission to decision.": "சமர்ப்பிப்பிலிருந்து முடிவு வரை ஒவ்வொரு விண்ணப்பத்தையும் கண்காணிக்கவும்.",
        "Financial assistance for eligible farmers": "தகுதியான விவசாயிகளுக்கான நிதியுதவி",
        "Financial assistance for eligible farmers.": "தகுதியான விவசாயிகளுக்கான நிதியுதவி.",
        "Financial assistance for eligible farmer families": "தகுதியான விவசாயக் குடும்பங்களுக்கான நிதியுதவி",
        "Financial assistance for wheat cultivation": "கோதுமை சாகுபடிக்கான நிதியுதவி",
        "Financial assistance for rice cultivation": "நெல் சாகுபடிக்கான நிதியுதவி",
        "Financial assistance for cotton cultivation": "பருத்தி சாகுபடிக்கான நிதியுதவி",
        "Financial assistance for turmeric cultivation": "மஞ்சள் சாகுபடிக்கான நிதியுதவி",
        "All": "அனைத்தும்",
        "Wheat": "கோதுமை",
        "Cotton": "பருத்தி",
        "Turmeric": "மஞ்சள்",
        "Cereal": "தானியம்",
        "Cereals": "தானியங்கள்",
        "Pulses": "பருப்பு வகைகள்",
        "Coconut": "தேங்காய்",
        "Oil Palm": "எண்ணெய் பனை",
        "Cashew": "முந்திரி",
        "Badam": "பாதாம்",
        "Neem": "வேம்பு",
        "Teak": "தேக்கு",
        "Administrative access protected": "நிர்வாக அணுகல் பாதுகாக்கப்பட்டுள்ளது",
        "Overall status of farmers, schemes and outreach activity.": "விவசாயிகள், திட்டங்கள் மற்றும் வெளிப்பணி நடவடிக்கைகளின் ஒட்டுமொத்த நிலை.",
        "View pending and completed farmer outreach calls.": "நிலுவையில் உள்ள மற்றும் முடிக்கப்பட்ட விவசாயி அழைப்புகளைப் பார்க்கவும்.",
        "Create, review and manage schemes available through PalmWise.": "PalmWise மூலம் கிடைக்கும் திட்டங்களை உருவாக்கி, மதிப்பாய்வு செய்து நிர்வகிக்கவும்.",
        "Farmer name": "விவசாயியின் பெயர்",
        "HIGH": "அதிகம்",
        "High": "அதிகம்",
        "high": "அதிகம்",

        // Scheme names, descriptions and benefits returned by the backend.
        "PM-KISAN": "பி.எம்.-கிசான்",
        "Wheat Support Scheme": "கோதுமை ஆதரவு திட்டம்",
        "Rice Support Scheme": "நெல் ஆதரவு திட்டம்",
        "Rice support scheme": "நெல் ஆதரவு திட்டம்",
        "Cereal Productivity Support": "தானிய உற்பத்தித் திறன் ஆதரவு",
        "Cereals & Pulses Cultivation Assistance": "தானியங்கள் மற்றும் பருப்பு வகை சாகுபடி உதவி",
        "Coconut Cultivation Support Scheme": "தேங்காய் சாகுபடி ஆதரவு திட்டம்",
        "Oil Palm Development Assistance": "எண்ணெய் பனை வளர்ச்சி உதவி",
        "Cash Crop Cultivation Support": "பணப்பயிர் சாகுபடி ஆதரவு",
        "Cashew & Nut Crop Development Support": "முந்திரி மற்றும் கொட்டை பயிர் மேம்பாட்டு ஆதரவு",
        "Tree Plantation & Agroforestry Support": "மர நடவு மற்றும் வேளாண் காடு ஆதரவு",
        "Cotton & Turmeric Crop Support": "பருத்தி மற்றும் மஞ்சள் பயிர் ஆதரவு",
        "Support scheme for rice farmers": "நெல் விவசாயிகளுக்கான ஆதரவு திட்டம்",
        "Support scheme for eligible rice farmers": "தகுதியான நெல் விவசாயிகளுக்கான ஆதரவு திட்டம்",
        "Financial assistance to eligible farmer families": "தகுதியான விவசாயக் குடும்பங்களுக்கு நிதியுதவி",
        "Financial assistance to eligible farmers": "தகுதியான விவசாயிகளுக்கான நிதியுதவி",
        "Financial assistance to Eligible farmers": "தகுதியான விவசாயிகளுக்கான நிதியுதவி",
        "Financial support for eligible wheat farmers": "தகுதியான கோதுமை விவசாயிகளுக்கான நிதியுதவி",
        "Financial support to eligible farmers": "தகுதியான விவசாயிகளுக்கான நிதியுதவி",
        "Cash cultivation support": "பணப்பயிர் சாகுபடி ஆதரவு",
        "Support for cash cultivation": "பணப்பயிர் சாகுபடிக்கான ஆதரவு",
        "Cotton & Turmeric support": "பருத்தி மற்றும் மஞ்சள் ஆதரவு",
        "Support for cotton and turmeric cultivation": "பருத்தி மற்றும் மஞ்சள் சாகுபடிக்கான ஆதரவு",
        "Support for cereal cultivation": "தானிய சாகுபடிக்கான ஆதரவு",
        "Support for cereal and pulse cultivation": "தானியங்கள் மற்றும் பருப்பு வகை சாகுபடிக்கான ஆதரவு",
        "Support for cash-crop cultivation": "பணப்பயிர் சாகுபடிக்கான ஆதரவு",
        "Support for coconut cultivation and farm inputs": "தேங்காய் சாகுபடி மற்றும் பண்ணை உள்ளீடுகளுக்கான ஆதரவு",
        "Support for oil-palm cultivation": "எண்ணெய் பனை சாகுபடிக்கான ஆதரவு",
        "Support for tree plantation and agroforestry": "மர நடவு மற்றும் வேளாண் காடுகளுக்கான ஆதரவு",
        "Support for cashew, badam and nut crop cultivation": "முந்திரி, பாதாம் மற்றும் கொட்டை பயிர் சாகுபடிக்கான ஆதரவு",
        "Support for coconut cultivation, orchard maintenance and productivity improvement.": "தேங்காய் சாகுபடி, தோட்டப் பராமரிப்பு மற்றும் உற்பத்தித் திறன் மேம்பாட்டிற்கான ஆதரவு.",
        "Assistance for oil-palm establishment, maintenance and productivity improvement.": "எண்ணெய் பனை நடவு, பராமரிப்பு மற்றும் உற்பத்தித் திறன் மேம்பாட்டிற்கான உதவி.",
        "Support programme for farmers cultivating commercially important cash crops.": "முக்கிய பணப்பயிர்களை பயிரிடும் விவசாயிகளுக்கான ஆதரவு திட்டம்.",
        "Support for cereal cultivation, productivity improvement and farm inputs.": "தானிய சாகுபடி, உற்பத்தித் திறன் மேம்பாடு மற்றும் பண்ணை உள்ளீடுகளுக்கான ஆதரவு.",
        "Support for cashew, badam and other nut-bearing crops through orchard development and farm inputs.": "தோட்ட மேம்பாடு மற்றும் பண்ணை உள்ளீடுகள் மூலம் முந்திரி, பாதாம் மற்றும் பிற கொட்டை பயிர்களுக்கான ஆதரவு.",
        "Support for cereals and pulses such as toor dal, bengal gram and other food-grain crops.": "துவரம் பருப்பு, கடலை மற்றும் பிற உணவு தானியப் பயிர்கள் போன்ற தானியங்கள் மற்றும் பருப்பு வகைகளுக்கான ஆதரவு.",
        "Support for growing neem, teak, coconut and other useful trees through plantation and maintenance assistance.": "வேம்பு, தேக்கு, தேங்காய் மற்றும் பிற பயனுள்ள மரங்களை நடவு செய்து பராமரிக்க உதவும் ஆதரவு.",
        "Support for cotton, turmeric and other commercial field crops through cultivation and farm-input assistance.": "பருத்தி, மஞ்சள் மற்றும் பிற வணிக வயல் பயிர்களுக்கு சாகுபடி மற்றும் பண்ணை உள்ளீட்டு உதவி.",

        // Login / registration.
        "Sign In": "உள்நுழைவு",
        "Access your PalmWise account": "உங்கள் PalmWise கணக்கை அணுகவும்",
        "Username": "பயனர்பெயர்",
        "Password": "கடவுச்சொல்",
        "Enter username": "பயனர்பெயரை உள்ளிடவும்",
        "Enter password": "கடவுச்சொல்லை உள்ளிடவும்",
        "Signing in...": "உள்நுழைகிறது...",
        "Create Farmer Account": "விவசாயி கணக்கை உருவாக்கவும்",
        "Create farmer account": "விவசாயி கணக்கை உருவாக்கவும்",
        "Demo Accounts": "சோதனை கணக்குகள்",
        "Demo accounts": "சோதனை கணக்குகள்",
        "Farmer: arun / 1234": "விவசாயி: அருண் / 1234",
        "Officer: officer / 1234": "அதிகாரி: அதிகாரி / 1234",
        "Register as a new farmer": "புதிய விவசாயியாக பதிவு செய்யவும்",
        "Register": "பதிவு",
        "Telugu": "தெலுங்கு",
        "Malayalam": "மலையாளம்",
        "Kannada": "கன்னடம்",
        "Kerala": "கேரளா",
        "Karnataka": "கர்நாடகா",
        "Andhra Pradesh": "ஆந்திரப் பிரதேசம்",
        "Telangana": "தெலங்கானா",
        "Other": "மற்றவை",
        "Example: Rice Support Scheme": "உதாரணம்: நெல் ஆதரவு திட்டம்",
        "e.g. 2.5": "உதா. 2.5",
        "e.g. Rice": "உதா. நெல்",
        "Creating Account...": "கணக்கு உருவாக்கப்படுகிறது...",
        "Back to Sign In": "உள்நுழைவுக்குத் திரும்பு",
        "Choose username": "பயனர்பெயரைத் தேர்ந்தெடுக்கவும்",
        "Choose password": "கடவுச்சொல்லைத் தேர்ந்தெடுக்கவும்",
        "Enter full name": "முழுப் பெயரை உள்ளிடவும்",
        "Enter phone number": "தொலைபேசி எண்ணை உள்ளிடவும்",
        "Enter location": "இடத்தை உள்ளிடவும்",
        "Example: Tamil Nadu or All": "உதாரணம்: தமிழ்நாடு அல்லது அனைத்தும்",
        "Example: Rice or All": "உதாரணம்: நெல் அல்லது அனைத்தும்",
        "Example: Financial assistance": "உதாரணம்: நிதியுதவி",
        "Describe the purpose of the scheme": "திட்டத்தின் நோக்கத்தை விவரிக்கவும்",

        // Farmer applications.
        "APPLICATION TRACKING": "விண்ணப்ப கண்காணிப்பு",
        "SUBMITTED": "சமர்ப்பிக்கப்பட்டது",
        "Application status": "விண்ணப்ப நிலை",
        "Track every application from submission to decision.": "சமர்ப்பிப்பிலிருந்து முடிவு வரை ஒவ்வொரு விண்ணப்பத்தையும் கண்காணிக்கவும்.",
        "No applications submitted yet": "விண்ணப்பங்கள் எதுவும் சமர்ப்பிக்கப்படவில்லை",
        "Explore eligible schemes to submit your first application.": "முதல் விண்ணப்பத்தைச் சமர்ப்பிக்க தகுதியான திட்டங்களைப் பார்க்கவும்.",
        "Browse schemes": "திட்டங்களைப் பார்க்கவும்",

        // Assistance page.
        "PalmWise Assisted Desk": "PalmWise உதவி மையம்",
        "Palm Wise Assisted Desk": "PalmWise உதவி மையம்",
        "PalmWise Farmer Assistance Desk": "PalmWise விவசாயி உதவி மையம்",
        "Clear guidance whenever you need it": "தேவைப்படும் போதெல்லாம் தெளிவான வழிகாட்டுதல்",
        "ASSISTANCE CENTRE": "உதவி மையம்",
        "Assistance Centre": "உதவி மையம்",
        "Get clear, step-by-step guidance on scheme eligibility, applications, status updates and farmer profile information. The PalmWise assistance centre helps you understand what to do next and where to get support.": "திட்டத் தகுதி, விண்ணப்பங்கள், நிலைப் புதுப்பிப்புகள் மற்றும் விவசாயி சுயவிவரத் தகவல்கள் குறித்து படிப்படியான தெளிவான வழிகாட்டுதலைப் பெறுங்கள். PalmWise உதவி மையம் அடுத்ததாக என்ன செய்ய வேண்டும், எங்கு உதவி பெற வேண்டும் என்பதைப் புரிந்துகொள்ள உதவுகிறது.",
        "HOW WE CAN HELP": "நாங்கள் எவ்வாறு உதவலாம்",
        "How can we help": "நாங்கள் எவ்வாறு உதவலாம்",
        "Assistance & guidance": "உதவி மற்றும் வழிகாட்டுதல்",
        "Scheme eligibility": "திட்டத் தகுதி",
        "Application assistance": "விண்ணப்ப உதவி",
        "Profile updates": "சுயவிவரப் புதுப்பிப்புகள்",
        "Eligibility is matched using your registered state, crop and land area.": "உங்கள் பதிவு செய்யப்பட்ட மாநிலம், பயிர் மற்றும் நில அளவைப் பயன்படுத்தி தகுதி பொருத்தப்படுகிறது.",
        "Review your profile before applying so that the information used for matching is accurate.": "விண்ணப்பிக்கும் முன் உங்கள் சுயவிவரத்தைச் சரிபார்க்கவும்; பொருத்தத்திற்குப் பயன்படுத்தப்படும் தகவல்கள் துல்லியமாக இருக்க வேண்டும்.",
        "Use My Applications to follow each submission from application received to review and final decision.": "விண்ணப்பம் பெறப்பட்டதிலிருந்து மதிப்பாய்வு மற்றும் இறுதி முடிவு வரை ஒவ்வொரு சமர்ப்பிப்பையும் கண்காணிக்க என் விண்ணப்பங்களைப் பயன்படுத்தவும்.",
        "Keep your crop, land area, location, language and contact details updated for more accurate scheme matching.": "திட்டப் பொருத்தத்தை மேலும் துல்லியமாக்க உங்கள் பயிர், நில அளவு, இடம், மொழி மற்றும் தொடர்பு விவரங்களைப் புதுப்பித்து வைத்திருக்கவும்.",
        "Use My Applications to follow each submission from application received to review and final decision.": "விண்ணப்பம் பெறப்பட்டதிலிருந்து மதிப்பாய்வு மற்றும் இறுதி முடிவு வரை ஒவ்வொரு சமர்ப்பிப்பையும் கண்காணிக்க என் விண்ணப்பங்களைப் பயன்படுத்தவும்.",
        "Keep your crop, land area, location, language and contact details updated for more accurate scheme matching.": "திட்டப் பொருத்தத்தை மேலும் துல்லியமாக்க உங்கள் பயிர், நில அளவு, இடம், மொழி மற்றும் தொடர்பு விவரங்களைப் புதுப்பித்து வைத்திருக்கவும்.",
        "Follow us": "எங்களைப் பின்தொடரவும்",
        "Customer Care": "வாடிக்கையாளர் சேவை",
        "Toll-Free Number": "கட்டணமில்லா எண்",
        "Service Hours": "சேவை நேரம்",
        "9:00 AM": "காலை 9:00",
        "6:00 PM": "மாலை 6:00",
        "AM": "மு.ப.",
        "PM": "பி.ப.",
        "am": "மு.ப.",
        "pm": "பி.ப.",

        // Common dynamic values.
        "Target crop": "இலக்கு பயிர்",
        "Target Crop": "இலக்கு பயிர்",
        "Benefit": "நன்மை",
        "Description": "விளக்கம்",
        "Land range": "நில அளவு",
        "State requirement": "மாநிலத் தேவை",
        "Crop requirement": "பயிர் தேவை",
        "Land requirement": "நில அளவு தேவை",
        "Passed": "தேர்ச்சி",
        "No farmer applications available.": "விவசாயி விண்ணப்பங்கள் எதுவும் இல்லை.",
        "No farmers found.": "விவசாயிகள் எவரும் இல்லை.",
        "No schemes found.": "திட்டங்கள் எதுவும் இல்லை.",
        "Loading schemes...": "திட்டங்கள் ஏற்றப்படுகின்றன...",
        "Loading scheme...": "திட்டம் ஏற்றப்படுகிறது...",
        "Loading government schemes...": "அரசுத் திட்டங்கள் ஏற்றப்படுகின்றன...",
        "No matched schemes are available at the moment.": "தற்போது பொருந்தும் திட்டங்கள் எதுவும் இல்லை.",
        "Update your profile or check again later for newly available programmes.": "புதிய திட்டங்களைப் பார்க்க சுயவிவரத்தைப் புதுப்பிக்கவும் அல்லது பின்னர் மீண்டும் பார்க்கவும்.",
        "These schemes match the crop, land area and state in your profile.": "இந்த திட்டங்கள் உங்கள் சுயவிவரத்தில் உள்ள பயிர், நில அளவு மற்றும் மாநிலத்துடன் பொருந்துகின்றன.",
        "No eligible schemes found": "தகுதியான திட்டங்கள் எதுவும் இல்லை",
        "A clear view of your profile, benefits and applications.": "உங்கள் சுயவிவரம், நன்மைகள் மற்றும் விண்ணப்பங்களின் தெளிவான பார்வை.",
        "Your farm at a glance": "உங்கள் பண்ணை ஒரு பார்வையில்",
        "View full profile": "முழு சுயவிவரத்தைப் பார்க்கவும்",
        "View all": "அனைத்தையும் பார்க்கவும்",
        "View matched schemes": "பொருந்தும் திட்டங்களைப் பார்க்கவும்",
        "Track applications": "விண்ணப்பங்களை கண்காணிக்கவும்",
        "View status": "நிலையைப் பார்க்கவும்",
        "FARM PROFILE": "பண்ணை சுயவிவரம்",
        "FARMER PROFILE": "விவசாயி சுயவிவரம்",
        "OPPORTUNITIES": "வாய்ப்புகள்",
        "PERSONALISED BENEFITS": "தனிப்பயன் நன்மைகள்",
        "GOVERNMENT PROGRAMME": "அரசுத் திட்டம்",
        "At a glance": "ஒரு பார்வையில்",
        "Loading farmer profile...": "விவசாயி சுயவிவரம் ஏற்றப்படுகிறது...",
        "Your information is protected": "உங்கள் தகவல் பாதுகாக்கப்படுகிறது",
        "APPLICATION #": "விண்ணப்ப எண்",
        "Reason for Rejection": "நிராகரிப்பிற்கான காரணம்",
        "Submitted Status": "சமர்ப்பிப்பு நிலை",
        "Language": "மொழி"
    };

    // Translate longest phrases first. This prevents entries such as "Farmer"
    // from corrupting "Farmer Name" before its complete translation is applied.
    const translationEntries = Object.entries(tamilTranslations)
        .sort(([a], [b]) => b.length - a.length);

    const translateText = (value) => {
        if (!value || language !== "Tamil") return value;
        let translated = value;
        for (const [english, tamil] of translationEntries) {
            // Case-insensitive replacement lets WELCOME BACK / HIGH / Submitted
            // and mixed-case backend values all use the same translation.
            const escaped = english.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const isWordLike = /^[A-Za-z0-9][A-Za-z0-9 .&'\-]*[A-Za-z0-9]$/.test(english);
            const pattern = isWordLike
                ? `(?<![A-Za-z])${escaped}(?![A-Za-z])`
                : escaped;
            translated = translated.replace(new RegExp(pattern, "gi"), tamil);
        }
        return translated;
    };

    useEffect(() => {
        document.documentElement.lang = language === "Tamil" ? "ta" : "en";
        if (language !== "Tamil") return;

        const translate = () => {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (!node.nodeValue?.trim()) continue;
                const translated = translateText(node.nodeValue);
                if (translated !== node.nodeValue) node.nodeValue = translated;
            }

            document.querySelectorAll("input, textarea, option").forEach(element => {
                if (element.placeholder) element.placeholder = translateText(element.placeholder);
                if (element.tagName === "OPTION" && element.textContent) {
                    const translated = translateText(element.textContent);
                    if (translated !== element.textContent) element.textContent = translated;
                }
            });
        };

        translate();
        const observer = new MutationObserver(translate);
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        return () => observer.disconnect();
    }, [language]);

    // ==========================================
    // AUTHENTICATION
    // ==========================================

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: ""
    });
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const [showRegistration, setShowRegistration] = useState(false);
    const [registrationLoading, setRegistrationLoading] = useState(false);
    const [registrationError, setRegistrationError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState("");

    const [registrationForm, setRegistrationForm] = useState({
        username: "",
        password: "",
        name: "",
        phone: "",
        language: "Tamil",
        location: "",
        state: "Tamil Nadu",
        landArea: "",
        crop: ""
    });

    // Restore the logged-in user after a browser refresh.
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("palmwiseUser");

            if (savedUser) {
                const user = JSON.parse(savedUser);

                if (user && user.role) {
                    setLoggedInUser(user);
                    setIsLoggedIn(true);

                    if (user.role === "FARMER") {
                        setPage("farmer");
                        setFarmerSection("overview");
                    } else {
                        setPage("officer");
                        setOfficerSection("dashboard");
                    }
                }
            }
        } catch (error) {
            console.error("Could not restore login session:", error);
            localStorage.removeItem("palmwiseUser");
        }
    }, []);

    // ==========================================
    // AUTHENTICATION
    // ==========================================

    const handleLoginChange = event => {
        const { name, value } = event.target;

        setLoginForm(previous => ({
            ...previous,
            [name]: value
        }));

        setLoginError("");
    };

    const handleRegistrationChange = event => {
        const { name, value } = event.target;

        setRegistrationForm(previous => ({
            ...previous,
            [name]: value
        }));

        setRegistrationError("");
        setRegistrationSuccess("");
    };

    const handleRegistration = async event => {
        event.preventDefault();

        setRegistrationLoading(true);
        setRegistrationError("");
        setRegistrationSuccess("");

        try {
            const response = await fetch(
                "http://localhost:8081/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: registrationForm.username,
                        password: registrationForm.password,
                        name: registrationForm.name,
                        phone: registrationForm.phone,
                        language: registrationForm.language,
                        location: registrationForm.location,
                        state: registrationForm.state,
                        landArea: Number(
                            registrationForm.landArea
                        ),
                        crop: registrationForm.crop
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();

                if (
                    errorText.includes(
                        "Username already exists"
                    )
                ) {
                    throw new Error(
                        "Username already exists. Please choose another username."
                    );
                }

                throw new Error(
                    "Registration failed. Please try again."
                );
            }

            const user = await response.json();

            const safeUser = {
                id: user.id,
                username: user.username,
                role: user.role,
                farmerId: user.farmerId
            };

            setRegistrationSuccess(
                "Registration successful! Logging you in..."
            );

            localStorage.setItem(
                "palmwiseUser",
                JSON.stringify(safeUser)
            );

            setTimeout(() => {
                setLoggedInUser(safeUser);
                setIsLoggedIn(true);
                setPage("farmer");
                setFarmerSection("overview");

                setRegistrationForm({
                    username: "",
                    password: "",
                    name: "",
                    phone: "",
                    language: "Tamil",
                    location: "",
                    state: "Tamil Nadu",
                    landArea: "",
                    crop: ""
                });

                setShowRegistration(false);
                setRegistrationSuccess("");
            }, 700);

        } catch (error) {
            console.error(
                "Registration error:",
                error
            );

            setRegistrationError(
                error.message ||
                "Registration failed."
            );
        } finally {
            setRegistrationLoading(false);
        }
    };

    const handleLogin = async event => {
        event.preventDefault();

        setLoginLoading(true);
        setLoginError("");

        try {
            const response = await fetch(
                `http://localhost:8081/api/auth/login?username=${encodeURIComponent(
    loginForm.username
)}&password=${encodeURIComponent(
    loginForm.password
)}`,
                {
                    method: "POST"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Invalid username or password"
                );
            }

            const user = await response.json();

            console.log("Logged in user:", user);

            // Store only non-sensitive account information.
            const safeUser = {
                id: user.id,
                username: user.username,
                role: user.role,
                farmerId: user.farmerId
            };

            setLoggedInUser(safeUser);
            setIsLoggedIn(true);
            localStorage.setItem(
                "palmwiseUser",
                JSON.stringify(safeUser)
            );

            if (user.role === "FARMER") {
                setPage("farmer");
                setFarmerSection("overview");
            } else {
                setPage("officer");
                setOfficerSection("outreach");
            }

            setLoginForm({
                username: "",
                password: ""
            });

        } catch (error) {
            console.error("Login error:", error);
            setLoginError(
                "Invalid username or password."
            );
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("palmwiseUser");
        setIsLoggedIn(false);
        setLoggedInUser(null);
        setPage("officer");
        setOfficerSection("outreach");
        setFarmerSection("overview");

        setLoginForm({
            username: "",
            password: ""
        });

        setLoginError("");
    };

    // ==========================================
    // OUTREACH TASKS
    // ==========================================

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // FARMER
    // ==========================================

    const [farmer, setFarmer] = useState(null);
    const [farmersData, setFarmersData] = useState([]);

    // ==========================================
    // ELIGIBLE SCHEMES
    // ==========================================

    const [schemes, setSchemes] = useState([]);
    const [schemesLoading, setSchemesLoading] = useState(true);

    // ==========================================
    // ALL SCHEMES - OFFICER
    // ==========================================

    const [allSchemes, setAllSchemes] = useState([]);
    const [allSchemesLoading, setAllSchemesLoading] = useState(true);

    // ==========================================
    // ELIGIBILITY
    // ==========================================

    const [eligibility, setEligibility] = useState(null);
    const [eligibilityLoading, setEligibilityLoading] = useState(false);

    // ==========================================
    // SCHEME MANAGEMENT
    // ==========================================

    const [showSchemeForm, setShowSchemeForm] = useState(false);

    const [schemeForm, setSchemeForm] = useState({
        name: "",
        description: "",
        targetCrop: "",
        minLandArea: "",
        maxLandArea: "",
        state: "",
        benefit: ""
    });

    // ==========================================
    // APPLICATION TRACKING
    // ==========================================

    const [applications, setApplications] = useState([]);
    const [applicationLoading, setApplicationLoading] = useState(false);
    const [applyingSchemeId, setApplyingSchemeId] = useState(null);

    // ==========================================
    // OUTREACH TASKS
    // ==========================================

    const updateStatus = (taskId, newStatus) => {
        fetch(
            `http://localhost:8081/api/outreach/${taskId}/status?status=${newStatus}`,
{
    method: "PUT"
}
)
.then(response => response.json())
    .then(() => {
        fetchTasks();
    })
    .catch(error => {
        console.error("Error updating task status:", error);
    });
};

const fetchTasks = () => {
    setLoading(true);

    fetch("http://localhost:8081/api/outreach/officer-dashboard")
        .then(response => response.json())
        .then(data => {
            setTasks(data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching outreach tasks:", error);
            setLoading(false);
        });
};

// ==========================================
// FARMER
// ==========================================

const fetchFarmer = () => {
    if (!loggedInUser?.farmerId) return;

    fetch(
        `http://localhost:8081/api/farmers/${loggedInUser.farmerId}`
    )
        .then(response => response.json())
        .then(data => {
            setFarmer(data);
        })
        .catch(error => {
            console.error("Error fetching farmer:", error);
        });
};

const fetchAllFarmers = () => {
    fetch("http://localhost:8081/api/farmers")
        .then(response => response.json())
        .then(data => setFarmersData(data))
        .catch(error => console.error("Error fetching farmers:", error));
};

// ==========================================
// ELIGIBLE SCHEMES FOR FARMER
// ==========================================

const fetchSchemes = () => {
    if (!loggedInUser?.farmerId) return;

    setSchemesLoading(true);

    fetch(
        `http://localhost:8081/api/farmers/${loggedInUser.farmerId}/eligible-schemes`
    )
        .then(async response => {
            console.log(
                "Eligible Scheme API status:",
                response.status
            );

            if (!response.ok) {
                const errorText = await response.text();

                throw new Error(
                    `Scheme API failed: ${response.status} ${errorText}`
                );
            }

            return response.json();
        })
        .then(data => {
            console.log("Eligible schemes:", data);

            setSchemes(data);
            setSchemesLoading(false);
        })
        .catch(error => {
            console.error(
                "ERROR FETCHING ELIGIBLE SCHEMES:",
                error
            );

            setSchemes([]);
            setSchemesLoading(false);
        });
};

// ==========================================
// ALL SCHEMES FOR OFFICER
// ==========================================

const fetchAllSchemes = () => {
    setAllSchemesLoading(true);

    fetch("http://localhost:8081/api/schemes")
        .then(response => response.json())
        .then(data => {
            console.log("All schemes:", data);

            setAllSchemes(data);
            setAllSchemesLoading(false);
        })
        .catch(error => {
            console.error(
                "Error fetching all schemes:",
                error
            );

            setAllSchemesLoading(false);
        });
};

// ==========================================
// ADD SCHEME
// ==========================================

const handleSchemeChange = event => {
    const { name, value } = event.target;

    setSchemeForm(previous => ({
        ...previous,
        [name]: value
    }));
};

const addScheme = async event => {
    event.preventDefault();

    try {
        const response = await fetch(
            "http://localhost:8081/api/schemes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: schemeForm.name,
                    description: schemeForm.description,
                    targetCrop: schemeForm.targetCrop,
                    minLandArea: Number(
                        schemeForm.minLandArea
                    ),
                    maxLandArea: Number(
                        schemeForm.maxLandArea
                    ),
                    state: schemeForm.state,
                    benefit: schemeForm.benefit
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to add scheme");
        }

        await response.json();

        alert("Scheme added successfully.");

        setSchemeForm({
            name: "",
            description: "",
            targetCrop: "",
            minLandArea: "",
            maxLandArea: "",
            state: "",
            benefit: ""
        });

        setShowSchemeForm(false);

        fetchAllSchemes();
        fetchSchemes();

    } catch (error) {
        console.error("Error adding scheme:", error);
        alert("Unable to add scheme.");
    }
};

// ==========================================
// DELETE SCHEME
// ==========================================

const deleteScheme = async schemeId => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this scheme?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(
            `http://localhost:8081/api/schemes/${schemeId}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete scheme");
        }

        alert("Scheme deleted successfully.");

        fetchAllSchemes();
        fetchSchemes();

    } catch (error) {
        console.error(
            "Error deleting scheme:",
            error
        );

        alert("Unable to delete scheme.");
    }
};

// ==========================================
// ELIGIBILITY ANALYSIS
// ==========================================

const checkEligibility = async (
    schemeId,
    schemeName
) => {
    setEligibilityLoading(true);
    setEligibility(null);

    try {
        if (!loggedInUser?.farmerId) {
            throw new Error("Farmer account not found");
        }

        const response = await fetch(
            `http://localhost:8081/api/farmers/${loggedInUser.farmerId}/scheme-analysis/${schemeId}`
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch eligibility"
            );
        }

        const data = await response.json();

        console.log(
            "Eligibility Analysis:",
            data
        );

        setEligibility(data);

    } catch (error) {
        console.error(
            "Eligibility API error:",
            error
        );

        setEligibility({
            eligible: false,
            schemeName: schemeName,
            reasons: [
                "Unable to check eligibility at this time."
            ]
        });

    } finally {
        setEligibilityLoading(false);
    }
};

// ==========================================
// APPLICATIONS
// ==========================================

const fetchApplications = () => {
    if (!loggedInUser) return;

    const endpoint =
        loggedInUser.role === "OFFICER"
            ? "http://localhost:8081/api/applications"
            : `http://localhost:8081/api/applications/farmer/${loggedInUser.farmerId}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            console.log(
                "Applications:",
                data
            );

            setApplications(data);
        })
        .catch(error => {
            console.error(
                "Error fetching applications:",
                error
            );
        });
};

// ==========================================
// APPLICATION HELPERS
// ==========================================

const getSchemeName = schemeId => {
    // Match IDs as strings so the lookup works even if
    // one API returns the ID as a number and another as text.
    const scheme =
        allSchemes.find(
            item =>
                String(item.id) === String(schemeId)
        ) ||
        schemes.find(
            item =>
                String(item.id) === String(schemeId)
        );

    return scheme
        ? scheme.name
        : "Loading scheme...";
};

const getApplicationStepState = (
    status,
    step
) => {
    const order = {
        SUBMITTED: 1,
        UNDER_REVIEW: 2,
        APPROVED: 3,
        REJECTED: 3
    };

    const currentStep = order[status] || 1;

    if (status === "REJECTED" && step === 3) {
        return "rejected";
    }

    if (currentStep >= step) {
        return "completed";
    }

    return "pending";
};

const getFarmerName = farmerId => {
    const match = farmersData.find(
        item => String(item.id) === String(farmerId)
    );
    return match?.name || `Farmer #${farmerId}`;
};

const isFinalApplication = application =>
    application?.status === "APPROVED" || application?.status === "REJECTED";

const formatAcres = value => {
    const number = Number(value);
    if (!Number.isFinite(number)) return `${value} acres`;
    return `${number} ${number === 1 ? "acre" : "acres"}`;
};

const getSchemeImage = scheme => {
    const text = `${scheme?.name || ""} ${scheme?.targetCrop || ""}`.toLowerCase();

    // Use distinct real agricultural photographs for each scheme category.
    if (text.includes("pm-kisan") || text.includes("pm kisan")) {
        return "https://commons.wikimedia.org/wiki/Special:FilePath/Farmer%20working%20in%20the%20field%20with%20their%20tractor.jpg?width=1200";
    }
    if (text.includes("rice") || text.includes("paddy")) {
        return "https://commons.wikimedia.org/wiki/Special:FilePath/FARMERS%20ENGAGED%20IN%20RICE%20CULTIVATION%2C%20KUTTANAD.jpg?width=1200";
    }
    if (text.includes("wheat")) {
        return "https://commons.wikimedia.org/wiki/Special:FilePath/Wheat%20Field%20in%20India.jpg?width=1200";
    }
    if (text.includes("pulse") || text.includes("toor") || text.includes("bengal gram")) {
        return "https://commons.wikimedia.org/wiki/Special:FilePath/Bajra%20-%20pearl%20millet.jpg?width=1200";
    }
    if (text.includes("cereal") || text.includes("millet")) {
        return "https://commons.wikimedia.org/wiki/Special:FilePath/Finger%20millet%20field.jpg?width=1200";
    }
    if (text.includes("coconut")) {
        return "https://upload.wikimedia.org/wikipedia/commons/6/6b/Cocos_nucifera_plantation_in_continental_India_%28Nagesh%29.jpg";
    }
    if (text.includes("palm")) {
        return "https://upload.wikimedia.org/wikipedia/commons/c/cf/Oilpalm_Mizoram_DSC7011.jpg";
    }
    if (text.includes("cashew") || text.includes("nut") || text.includes("badam")) {
        return "https://upload.wikimedia.org/wikipedia/commons/7/7a/Cashew_Plantations_in_Dodamarg%2C_Sindhudurg%2C_Maharashtra%2C_India.jpg";
    }
    if (text.includes("cotton")) {
        return "https://upload.wikimedia.org/wikipedia/commons/4/43/Cottonfieldindia.jpg";
    }
    if (text.includes("turmeric")) {
        return "https://upload.wikimedia.org/wikipedia/commons/4/43/%22Field_of_Turmeric_with_coconut_as_a_inter_crop%22.jpg";
    }
    if (text.includes("tree") || text.includes("agroforestry") || text.includes("neem") || text.includes("teak")) {
        return "https://commons.wikimedia.org/wiki/Special:FilePath/Teak%20Plantation.jpg?width=1200";
    }
    return "https://commons.wikimedia.org/wiki/Special:FilePath/FARMERS%20ENGAGED%20IN%20RICE%20CULTIVATION%2C%20KUTTANAD.jpg?width=1200";
};

// ==========================================
// APPLY FOR SCHEME
// ==========================================

const applyForScheme = async (
    schemeId,
    schemeName
) => {
    if (!loggedInUser?.farmerId) return;

    const existing = applications.find(
        application =>
            String(application.schemeId) === String(schemeId)
    );

    if (existing) {
        setSubmissionMessage({
            type: "already",
            schemeName,
            applicationId: existing.id
        });
        setFarmerSection("schemes");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    setApplicationLoading(true);
    setApplyingSchemeId(schemeId);
    setSubmissionMessage(null);

    try {
        const response = await fetch(
            `http://localhost:8081/api/applications?farmerId=${loggedInUser.farmerId}&schemeId=${schemeId}`,
            { method: "POST" }
        );

        if (!response.ok) {
            throw new Error("Failed to submit application");
        }

        const data = await response.json();

        setSubmissionMessage({
            type: "success",
            schemeName,
            applicationId: data.id
        });

        await fetchApplications();
        setFarmerSection("schemes");
        window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
        console.error("Application error:", error);
        setSubmissionMessage({
            type: "error",
            schemeName,
            message: "Unable to submit the application. Please try again."
        });
    } finally {
        setApplicationLoading(false);
        setApplyingSchemeId(null);
    }
};

// ==========================================
// UPDATE APPLICATION STATUS
// ==========================================

const updateApplicationStatus = async (
    applicationId,
    newStatus,
    comment = ""
) => {
    const currentApplication = applications.find(
        application => String(application.id) === String(applicationId)
    );

    if (isFinalApplication(currentApplication)) {
        setSubmissionMessage({
            type: "error",
            message: "This application has already been approved or rejected and cannot be changed again."
        });
        return;
    }

    if (
        (newStatus === "APPROVED" || newStatus === "REJECTED") &&
        !comment.trim()
    ) {
        setSubmissionMessage({
            type: "error",
            message: "Please enter an officer comment before approving or rejecting the application."
        });
        return;
    }

    try {
        const params = new URLSearchParams({
            status: newStatus,
            comment: comment.trim()
        });

        const response = await fetch(
            `http://localhost:8081/api/applications/${applicationId}/status?${params.toString()}`,
            { method: "PUT" }
        );

        if (!response.ok) {
            throw new Error("Failed to update application status");
        }

        await response.json();

        setCommentDrafts(previous => ({
            ...previous,
            [applicationId]: ""
        }));

        await fetchApplications();
        setSubmissionMessage({
            type: "success",
            message: `Application #${applicationId} updated successfully.`
        });
    } catch (error) {
        console.error("Application status error:", error);
        setSubmissionMessage({
            type: "error",
            message: "Unable to update the application status."
        });
    }
};

// ==========================================
// INITIAL LOAD
// ==========================================

useEffect(() => {
    if (!isLoggedIn || !loggedInUser) return;

    fetchAllSchemes();
    fetchAllFarmers();
    fetchApplications();

    if (loggedInUser.role === "OFFICER") {
        fetchTasks();
    }

    if (
        loggedInUser.role === "FARMER" &&
        loggedInUser.farmerId
    ) {
        fetchFarmer();
        fetchSchemes();
    }
}, [
    isLoggedIn,
    loggedInUser
]);

// ==========================================
// DASHBOARD COUNTS
// ==========================================

const pendingCalls =
    tasks.filter(
        task => task.status === "PENDING"
    ).length;

const completedCalls =
    tasks.filter(
        task => task.status === "COMPLETED"
    ).length;

const eligibleSchemes = allSchemes.length;
const farmers = farmersData.length;

const handleLanguageChange = event => {
    const nextLanguage = event.target.value;
    localStorage.setItem("palmwiseLanguage", nextLanguage);
    setLanguage(nextLanguage);
    window.location.reload();
};

// ==========================================
// UI
// ==========================================

if (!isLoggedIn) {
    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-brand">
                    <div className="login-logo">
                        🌱
                    </div>

                    <h1>
                        PalmWise Advanced
                    </h1>

                    <p>
                        Government Farmer Assistance Platform
                    </p>
                </div>

                {!showRegistration ? (
                    <form
                        className="login-form"
                        onSubmit={handleLogin}
                    >

                        <h2>
                            Sign In
                        </h2>

                        <p className="login-subtitle">
                            Access your PalmWise account
                        </p>

                        <div className="form-group">
                            <label>
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={
                                    loginForm.username
                                }
                                onChange={
                                    handleLoginChange
                                }
                                placeholder="Enter username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={
                                    loginForm.password
                                }
                                onChange={
                                    handleLoginChange
                                }
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        {loginError && (
                            <div className="login-error">
                                {loginError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loginLoading}
                        >
                            {loginLoading
                                ? "Signing in..."
                                : "Sign In"}
                        </button>

                        <button
                            type="button"
                            className="register-link-button"
                            onClick={() => {
                                setShowRegistration(true);
                                setLoginError("");
                            }}
                        >
                            Create Farmer Account
                        </button>

                        <div className="demo-accounts">
                            <strong>
                                Demo Accounts
                            </strong>

                            <span>
                                    Farmer: arun / 1234
                                </span>

                            <span>
                                    Officer: officer / 1234
                                </span>
                        </div>

                    </form>
                ) : (
                    <form
                        className="login-form registration-form"
                        onSubmit={handleRegistration}
                    >

                        <h2>
                            Create Farmer Account
                        </h2>

                        <p className="login-subtitle">
                            Register as a new farmer
                        </p>

                        <div className="registration-grid">

                            <div className="form-group">
                                <label>
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={
                                        registrationForm.username
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    placeholder="Choose username"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={
                                        registrationForm.password
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    placeholder="Choose password"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={
                                        registrationForm.name
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Phone
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={
                                        registrationForm.phone
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Preferred Language
                                </label>

                                <select
                                    name="language"
                                    value={
                                        registrationForm.language
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    required
                                >
                                    <option value="Tamil">
                                        Tamil
                                    </option>

                                    <option value="English">
                                        English
                                    </option>

                                    <option value="Telugu">
                                        Telugu
                                    </option>

                                    <option value="Malayalam">
                                        Malayalam
                                    </option>

                                    <option value="Kannada">
                                        Kannada
                                    </option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    value={
                                        registrationForm.location
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    placeholder="Enter location"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    State
                                </label>

                                <select
                                    name="state"
                                    value={
                                        registrationForm.state
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    required
                                >
                                    <option value="Tamil Nadu">
                                        Tamil Nadu
                                    </option>

                                    <option value="Kerala">
                                        Kerala
                                    </option>

                                    <option value="Karnataka">
                                        Karnataka
                                    </option>

                                    <option value="Andhra Pradesh">
                                        Andhra Pradesh
                                    </option>

                                    <option value="Telangana">
                                        Telangana
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>
                                    Land Area (acres)
                                </label>

                                <input
                                    type="number"
                                    name="landArea"
                                    value={
                                        registrationForm.landArea
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    placeholder="e.g. 2.5"
                                    min="0"
                                    step="0.1"
                                    required
                                />
                            </div>

                            <div className="form-group registration-wide">
                                <label>
                                    Crop
                                </label>

                                <input
                                    type="text"
                                    name="crop"
                                    value={
                                        registrationForm.crop
                                    }
                                    onChange={
                                        handleRegistrationChange
                                    }
                                    placeholder="e.g. Rice"
                                    required
                                />
                            </div>

                        </div>

                        {registrationError && (
                            <div className="login-error">
                                {registrationError}
                            </div>
                        )}

                        {registrationSuccess && (
                            <div className="registration-success">
                                {registrationSuccess}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={registrationLoading}
                        >
                            {registrationLoading
                                ? "Creating Account..."
                                : "Register"}
                        </button>

                        <button
                            type="button"
                            className="register-link-button"
                            onClick={() => {
                                setShowRegistration(false);
                                setRegistrationError("");
                                setRegistrationSuccess("");
                            }}
                        >
                            ← Back to Sign In
                        </button>

                    </form>
                )}

            </div>

        </div>
    );
}

return (
    <div className="app">

        {/* ==========================================
                TOP BAR
            ========================================== */}

        <header className={`topbar ${page === "farmer" ? "farmer-global-topbar" : ""}`}>

            <div className="topbar-brand">
                <div className="topbar-brand-mark" aria-hidden="true">✦</div>
                <div>
                    <div className="topbar-brand-name">PalmWise</div>
                    <div className="topbar-brand-subtitle">ADVANCED</div>
                </div>
            </div>

            <div className="topbar-platform">
                <span className="topbar-platform-divider" aria-hidden="true" />
                <span>Government Farmer Assistance Platform</span>
            </div>

            <div className="topbar-actions">
                <nav className="navigation">

                    {loggedInUser?.role === "OFFICER" && (
                        <button
                            className={page === "officer" ? "active-nav" : ""}
                            onClick={() => setPage("officer")}
                        >
                            Officer Dashboard
                        </button>
                    )}

                    {loggedInUser?.role === "FARMER" && (
                        <button
                            className={page === "farmer" ? "active-nav" : ""}
                            onClick={() => setPage("farmer")}
                        >
                            Farmer Portal
                        </button>
                    )}

                </nav>

                <div className="officer">

                    {loggedInUser?.role === "FARMER" && (
                        <div className="topbar-user-avatar" aria-hidden="true">
                            {(farmer?.name || loggedInUser?.username || "F").charAt(0).toUpperCase()}
                        </div>
                    )}

                    <div className="topbar-user-copy">
                        <span>
                            {loggedInUser?.role === "OFFICER"
                                ? "Officer"
                                : "Farmer"}
                        </span>

                        <strong>
                            {loggedInUser?.role === "FARMER"
                                ? (farmer?.name || loggedInUser?.username)
                                : loggedInUser?.username}
                        </strong>
                    </div>

                    <label className="language-switcher">
                        <span>Language</span>
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            aria-label="Language"
                        >
                            <option value="English">English</option>
                            <option value="Tamil">தமிழ்</option>
                        </select>
                    </label>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>
            </div>

        </header>

        <main className={page === "farmer" ? "dashboard farmer-app-main" : page === "officer" ? "dashboard officer-app-main" : "dashboard"}>

            {/* ==========================================
                    OFFICER DASHBOARD
                ========================================== */}

            {page === "officer" &&
                loggedInUser?.role === "OFFICER" && (
                    <section className="officer-shell">
                        <aside className="officer-sidebar">
                            <div className="officer-sidebar-brand">
                                <div className="sidebar-logo">PW</div>
                                <div><strong>PalmWise</strong><span>ADVANCED</span></div>
                            </div>
                            <div className="officer-account">
                                <div className="profile-avatar">O</div>
                                <div><strong>Officer Portal</strong><span>Government Administration</span></div>
                            </div>
                            <nav className="officer-sidebar-nav" aria-label="Officer navigation">
                                <button className={`officer-sidebar-link ${officerSection === "dashboard" ? "active" : ""}`} onClick={() => { setOfficerSection("dashboard"); setOfficerDetail(null); }}><span>⌂</span><strong>Dashboard</strong></button>
                                <button className={`officer-sidebar-link ${officerSection === "outreach" ? "active" : ""}`} onClick={() => { setOfficerSection("outreach"); setOutreachFilter("PENDING"); }}><span>◈</span><strong>Outreach Tasks</strong></button>
                                <button className={`officer-sidebar-link ${officerSection === "schemes" ? "active" : ""}`} onClick={() => setOfficerSection("schemes")}><span>◆</span><strong>Government Scheme Management</strong></button>
                                <button className={`officer-sidebar-link ${officerSection === "applications" ? "active" : ""}`} onClick={() => setOfficerSection("applications")}><span>▣</span><strong>Farmers Applications</strong></button>
                            </nav>
                            <div className="sidebar-footer">
                                <div className="sidebar-secure"><span>●</span><div><strong>Secure Officer Portal</strong><small>Administrative access protected</small></div></div>
                                <button className="sidebar-logout" onClick={handleLogout}>Sign out</button>
                            </div>
                        </aside>
                        <div className="officer-main">
                            <header className="officer-page-heading">
                                <div>
                                    <span className="eyebrow">OFFICER SERVICES</span>
                                    <h1>{officerSection === "dashboard" ? "Officer Dashboard" : officerSection === "outreach" ? "Outreach Tasks" : officerSection === "schemes" ? "Government Scheme Management" : "Farmers Applications"}</h1>
                                    <p>{officerSection === "dashboard" ? "Overall status of farmers, schemes and outreach activity." : officerSection === "outreach" ? "View pending and completed farmer outreach calls." : officerSection === "schemes" ? "Create, review and manage schemes available through PalmWise." : "Review farmer applications and update their processing status."}</p>
                                </div>
                            </header>

                        {/* ==========================================
                            OFFICER DASHBOARD
                        ========================================== */}

                        {officerSection === "dashboard" && (
                            <>
                                <section className="welcome officer-welcome">
                                    <h2>Overall Status</h2>
                                    <p>Click any number to view the corresponding details.</p>
                                </section>

                                <section className="stats officer-dashboard-stats">
                                    <button className="stat-card stat-card-clickable" onClick={() => setOfficerDetail("farmers")}>
                                        <span>Farmers</span>
                                        <strong>{farmers}</strong>
                                        <small>Registered farmers</small>
                                    </button>

                                    <button className="stat-card stat-card-clickable" onClick={() => setOfficerDetail("schemes")}>
                                        <span>Eligible Schemes</span>
                                        <strong>{eligibleSchemes}</strong>
                                        <small>Available government schemes</small>
                                    </button>

                                    <button className="stat-card stat-card-clickable" onClick={() => { setOfficerSection("outreach"); setOutreachFilter("PENDING"); }}>
                                        <span>Pending Calls</span>
                                        <strong>{pendingCalls}</strong>
                                        <small>Calls awaiting action</small>
                                    </button>

                                    <button className="stat-card stat-card-clickable" onClick={() => { setOfficerSection("outreach"); setOutreachFilter("COMPLETED"); }}>
                                        <span>Completed Calls</span>
                                        <strong>{completedCalls}</strong>
                                        <small>Calls completed</small>
                                    </button>
                                </section>

                                {officerDetail === "farmers" && (
                                    <section className="tasks officer-panel dashboard-detail-panel">
                                        <div className="section-header">
                                            <h2>Farmers</h2>
                                            <button onClick={() => setOfficerDetail(null)}>Close</button>
                                        </div>
                                        {farmersData.length === 0 ? <p>No farmers found.</p> : farmersData.map(item => (
                                            <div className="detail-row" key={item.id}>
                                                <strong>{item.name}</strong>
                                                <span>{item.phone}</span>
                                                <span>{item.location}, {item.state}</span>
                                                <span>{item.cropType} · {formatAcres(item.landArea)}</span>
                                            </div>
                                        ))}
                                    </section>
                                )}

                                {officerDetail === "schemes" && (
                                    <section className="tasks officer-panel dashboard-detail-panel">
                                        <div className="section-header">
                                            <h2>Eligible Schemes</h2>
                                            <button onClick={() => setOfficerDetail(null)}>Close</button>
                                        </div>
                                        {allSchemes.length === 0 ? <p>No schemes found.</p> : allSchemes.map(item => (
                                            <div className="detail-row" key={item.id}>
                                                <strong>{item.name}</strong>
                                                <span>{item.targetCrop}</span>
                                                <span>{item.state}</span>
                                                <span>{item.minLandArea}–{item.maxLandArea} acres</span>
                                            </div>
                                        ))}
                                    </section>
                                )}
                            </>
                        )}

                        {/* ==========================================
                            OUTREACH TASKS
                        ========================================== */}

                        {officerSection === "outreach" && (
                        <section className="tasks officer-panel">

                            <div className="section-header">

                                <h2>
                                    Outreach Tasks
                                </h2>

                                <div className="outreach-filter-actions">
                                    <button className={outreachFilter === "PENDING" ? "filter-active" : ""} onClick={() => setOutreachFilter("PENDING")}>Pending Calls</button>
                                    <button className={outreachFilter === "COMPLETED" ? "filter-active" : ""} onClick={() => setOutreachFilter("COMPLETED")}>Completed Calls</button>
                                    <button onClick={fetchTasks}>Refresh</button>
                                </div>

                            </div>

                            {loading ? (

                                <p>
                                    Loading outreach
                                    tasks...
                                </p>

                            ) : tasks.length === 0 ? (

                                <p>
                                    No outreach tasks
                                    available.
                                </p>

                            ) : (

                                tasks
                                    .filter(task => outreachFilter === "ALL" || task.status === outreachFilter)
                                    .map(task => (

                                    <div
                                        className="task-card"
                                        key={task.taskId}
                                    >

                                        <div className="task-main">

                                            <h3>
                                                {task.farmerName}
                                            </h3>

                                            <p>
                                                📞{" "}
                                                {task.phone}
                                            </p>

                                            <p>
                                                📍{" "}
                                                {task.location}
                                                {" · "}
                                                {
                                                    task.preferredLanguage
                                                }
                                            </p>

                                        </div>

                                        <div className="scheme">

                                            <strong>
                                                {
                                                    task.schemeName
                                                }
                                            </strong>

                                            <p>
                                                {
                                                    task.benefit
                                                }
                                            </p>

                                        </div>

                                        <div className="task-status">

                                            <span className="priority">
                                                {
                                                    task.priority
                                                }
                                            </span>

                                            <span className="status">
                                                {
                                                    task.status
                                                }
                                            </span>

                                            {task.status ===
                                                "PENDING" && (

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                task.taskId,
                                                                "CONTACTED"
                                                            )
                                                        }
                                                    >
                                                        Contact Farmer
                                                    </button>

                                                )}

                                            {task.status ===
                                                "CONTACTED" && (

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                task.taskId,
                                                                "COMPLETED"
                                                            )
                                                        }
                                                    >
                                                        Complete Call
                                                    </button>

                                                )}

                                        </div>

                                    </div>

                                ))

                            )}

                        </section>
                        )}

                        {/* ==========================================
                            SCHEME MANAGEMENT
                        ========================================== */}

                        {officerSection === "schemes" && (
                        <section className="tasks scheme-management officer-panel">

                            <div className="section-header">

                                <div>

                                    <h2>
                                        Government Scheme Management
                                    </h2>

                                    <p className="management-description">
                                        Manage government schemes
                                        available in the
                                        PalmWise platform.
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        setShowSchemeForm(
                                            !showSchemeForm
                                        )
                                    }
                                >
                                    {showSchemeForm
                                        ? "Close Form"
                                        : "Add Scheme"}
                                </button>

                            </div>

                            {/* ADD SCHEME FORM */}

                            {showSchemeForm && (

                                <form
                                    className="scheme-form"
                                    onSubmit={addScheme}
                                >

                                    <div className="form-grid">

                                        <div className="form-group">

                                            <label>
                                                Scheme Name
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                value={
                                                    schemeForm.name
                                                }
                                                onChange={
                                                    handleSchemeChange
                                                }
                                                placeholder="Example: Rice Support Scheme"
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Target Crop
                                            </label>

                                            <input
                                                type="text"
                                                name="targetCrop"
                                                value={
                                                    schemeForm.targetCrop
                                                }
                                                onChange={
                                                    handleSchemeChange
                                                }
                                                placeholder="Example: Rice or All"
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Minimum Land Area
                                                (acres)
                                            </label>

                                            <input
                                                type="number"
                                                name="minLandArea"
                                                value={
                                                    schemeForm.minLandArea
                                                }
                                                onChange={
                                                    handleSchemeChange
                                                }
                                                min="0"
                                                step="0.1"
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                Maximum Land Area
                                                (acres)
                                            </label>

                                            <input
                                                type="number"
                                                name="maxLandArea"
                                                value={
                                                    schemeForm.maxLandArea
                                                }
                                                onChange={
                                                    handleSchemeChange
                                                }
                                                min="0"
                                                step="0.1"
                                                required
                                            />

                                        </div>

                                        <div className="form-group">

                                            <label>
                                                State
                                            </label>

                                            <input
                                                type="text"
                                                name="state"
                                                value={
                                                    schemeForm.state
                                                }
                                                onChange={
                                                    handleSchemeChange
                                                }
                                                placeholder="Example: Tamil Nadu or All"
                                                required
                                            />

                                        </div>

                                        <div className="form-group form-group-wide">

                                            <label>
                                                Benefit
                                            </label>

                                            <input
                                                type="text"
                                                name="benefit"
                                                value={
                                                    schemeForm.benefit
                                                }
                                                onChange={
                                                    handleSchemeChange
                                                }
                                                placeholder="Example: Financial assistance"
                                                required
                                            />

                                        </div>

                                        <div className="form-group form-group-wide">

                                            <label>
                                                Description
                                            </label>

                                            <textarea
                                                name="description"
                                                value={
                                                    schemeForm.description
                                                }
                                                onChange={
                                                    handleSchemeChange
                                                }
                                                placeholder="Describe the purpose of the scheme"
                                                rows="3"
                                                required
                                            />

                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        className="save-scheme-button"
                                    >
                                        Save Scheme
                                    </button>

                                </form>

                            )}

                            {/* SCHEME LIST */}

                            <div className="managed-schemes">

                                {allSchemesLoading ? (

                                    <p>
                                        Loading schemes...
                                    </p>

                                ) : allSchemes.length === 0 ? (

                                    <p>
                                        No schemes found.
                                    </p>

                                ) : (

                                    allSchemes.map(
                                        scheme => (

                                            <div
                                                className="managed-scheme-card"
                                                key={
                                                    scheme.id
                                                }
                                            >

                                                <div className="managed-scheme-info">

                                                    <h3>
                                                        {
                                                            scheme.name
                                                        }
                                                    </h3>

                                                    <p>
                                                        {
                                                            scheme.description
                                                        }
                                                    </p>

                                                    <div className="scheme-details">

                                                        <span>
                                                            🌾 Crop:{" "}
                                                            {
                                                                scheme.targetCrop
                                                            }
                                                        </span>

                                                        <span>
                                                            📐 Land:{" "}
                                                            {
                                                                scheme.minLandArea
                                                            }
                                                            {" - "}
                                                            {
                                                                scheme.maxLandArea
                                                            }
                                                            {" acres"}
                                                        </span>

                                                        <span>
                                                            📍 State:{" "}
                                                            {
                                                                scheme.state
                                                            }
                                                        </span>

                                                    </div>

                                                    <div className="managed-benefit">

                                                        <strong>
                                                            Benefit:
                                                        </strong>{" "}
                                                        {
                                                            scheme.benefit
                                                        }

                                                    </div>

                                                </div>

                                                <button
                                                    className="delete-scheme-button"
                                                    onClick={() =>
                                                        deleteScheme(
                                                            scheme.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        )
                                    )

                                )}

                            </div>

                        </section>
                        )}

                        {/* ==========================================
                            OFFICER APPLICATIONS
                        ========================================== */}

                        {officerSection === "applications" && (
                        <section className="tasks officer-panel">

                            <div className="section-header">
                                <div>
                                    <h2>Farmer Applications</h2>
                                    <p>Review each farmer application and record a decision comment.</p>
                                </div>
                                <button onClick={() => { fetchAllSchemes(); fetchAllFarmers(); fetchApplications(); }}>Refresh</button>
                            </div>

                            {applications.filter(application => !isFinalApplication(application)).length === 0 ? (
                                <p>No pending farmer applications available.</p>
                            ) : (
                                applications.filter(application => !isFinalApplication(application)).map(application => {
                                    const farmerName = getFarmerName(application.farmerId);
                                    const schemeName = getSchemeName(application.schemeId);
                                    const comment = commentDrafts[application.id] || "";

                                    return (
                                        <div className="application-card officer-application-card" key={application.id}>
                                            <div className="application-card-header">
                                                <div>
                                                    <span className="application-label">APPLICATION #{application.id}</span>
                                                    <h3>{farmerName}</h3>
                                                    <p className="application-scheme-name">{schemeName}</p>
                                                </div>
                                                <span className={`application-status status-${application.status.toLowerCase()}`}>
                                                    {application.status.replace("_", " ")}
                                                </span>
                                            </div>

                                            <div className="application-detail-grid">
                                                <div><span>Farmer Name</span><strong>{farmerName}</strong></div>
                                                <div><span>Scheme Name</span><strong>{schemeName}</strong></div>
                                                <div><span>Submitted Status</span><strong>{application.status.replace("_", " ")}</strong></div>
                                            </div>

                                            {application.officerComment && (
                                                <div className="officer-existing-comment">
                                                    <strong>Officer Comment</strong>
                                                    <p>{application.officerComment}</p>
                                                </div>
                                            )}

                                            <div className="officer-comment-box">
                                                <label htmlFor={`comment-${application.id}`}>
                                                    Officer Comment
                                                </label>
                                                <textarea
                                                    id={`comment-${application.id}`}
                                                    rows="3"
                                                    value={comment}
                                                    onChange={event => setCommentDrafts(previous => ({
                                                        ...previous,
                                                        [application.id]: event.target.value
                                                    }))}
                                                    placeholder="Enter the reason or decision comment. Required for approval or rejection."
                                                />
                                            </div>

                                            <div className="application-actions">
                                                <button onClick={() => updateApplicationStatus(application.id, "UNDER_REVIEW", comment)}>
                                                    Under Review
                                                </button>
                                                <button onClick={() => updateApplicationStatus(application.id, "APPROVED", comment)}>
                                                    Approve
                                                </button>
                                                <button className="reject-button" onClick={() => updateApplicationStatus(application.id, "REJECTED", comment)}>
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}

                        </section>
                        )}
                        </div>
                    </section>
                )}

            {/* ==========================================
                    FARMER PORTAL
                ========================================== */}

            {page === "farmer" &&
                loggedInUser?.role === "FARMER" && (

                    <section className="farmer-shell">

                        <aside className="farmer-sidebar">
                            <div className="sidebar-brand">
                                <div className="sidebar-logo">PW</div>
                                <div>
                                    <strong>PalmWise</strong>
                                    <span>Advanced</span>
                                </div>
                            </div>

                            <nav className="farmer-sidebar-nav" aria-label="Farmer navigation">
                                <button
                                    className={farmerSection === "overview" ? "sidebar-link active" : "sidebar-link"}
                                    onClick={() => setFarmerSection("overview")}
                                >
                                    <span className="sidebar-icon">⌂</span>
                                    <span>Overview</span>
                                </button>
                                <button
                                    className={farmerSection === "profile" ? "sidebar-link active" : "sidebar-link"}
                                    onClick={() => setFarmerSection("profile")}
                                >
                                    <span className="sidebar-icon">◯</span>
                                    <span>My Profile</span>
                                </button>
                                <button
                                    className={farmerSection === "schemes" ? "sidebar-link active" : "sidebar-link"}
                                    onClick={() => setFarmerSection("schemes")}
                                >
                                    <span className="sidebar-icon">◆</span>
                                    <span>Eligible Schemes</span>
                                    <span className="sidebar-count">{Math.min(schemes.length, 5)}</span>
                                </button>
                                <button
                                    className={farmerSection === "applications" ? "sidebar-link active" : "sidebar-link"}
                                    onClick={() => setFarmerSection("applications")}
                                >
                                    <span className="sidebar-icon">▣</span>
                                    <span>My Applications</span>
                                    <span className="sidebar-count">{applications.length}</span>
                                </button>
                                <button
                                    className={farmerSection === "support" ? "sidebar-link active" : "sidebar-link"}
                                    onClick={() => setFarmerSection("support")}
                                >
                                    <span className="sidebar-icon">?</span>
                                    <span>Support / Assistance</span>
                                </button>
                            </nav>

                            <div className="sidebar-footer">
                                <div className="sidebar-secure">
                                    <span>●</span>
                                    <div>
                                        <strong>Secure Portal</strong>
                                        <small>Your information is protected</small>
                                    </div>
                                </div>
                                <button className="sidebar-logout" onClick={handleLogout}>
                                    Sign out
                                </button>
                            </div>
                        </aside>

                        <div className="farmer-main">
                            <header className="farmer-topbar">
                                <div>
                                    <span className="eyebrow">FARMER SERVICES</span>
                                    <h1>
                                        {farmerSection === "overview" && "Farmer Overview"}
                                        {farmerSection === "profile" && "My Profile"}
                                        {farmerSection === "schemes" && "Eligible Government Schemes"}
                                        {farmerSection === "applications" && "My Applications"}
                                        {farmerSection === "support" && "Support & Assistance"}
                                    </h1>
                                    <p>
                                        {farmerSection === "overview" && "A clear view of your profile, benefits and applications."}
                                        {farmerSection === "profile" && "Review the information associated with your farmer account."}
                                        {farmerSection === "schemes" && "Government programmes matched to your farm profile."}
                                        {farmerSection === "applications" && "Track every application from submission to decision."}
                                        {farmerSection === "support" && "Find guidance and assistance for using PalmWise."}
                                    </p>
                                </div>
                            </header>

                            {farmerSection === "overview" && (
                                <>
                                    <section className="executive-welcome">
                                        <div>
                                            <span className="eyebrow">WELCOME BACK</span>
                                            <h2>Your Farm Dashboard</h2>
                                            <p>Manage your farm profile, discover eligible government schemes and monitor applications from one place.</p>
                                        </div>
                                        <button className="primary-button" onClick={() => setFarmerSection("schemes")}>Explore schemes →</button>
                                    </section>

                                    <div className="farmer-kpi-grid">
                                        <button className="kpi-card" onClick={() => setFarmerSection("profile")}>
                                            <span className="kpi-label">FARMER PROFILE</span>
                                            <strong>{farmer ? farmer.name : "Loading..."}</strong>
                                            <span className="kpi-link">View profile →</span>
                                        </button>
                                        <button className="kpi-card" onClick={() => setFarmerSection("schemes")}>
                                            <span className="kpi-label">ELIGIBLE SCHEMES</span>
                                            <strong>{schemes.length}</strong>
                                            <span className="kpi-link">View matched schemes →</span>
                                        </button>
                                        <button className="kpi-card" onClick={() => setFarmerSection("applications")}>
                                            <span className="kpi-label">MY APPLICATIONS</span>
                                            <strong>{applications.length}</strong>
                                            <span className="kpi-link">Track applications →</span>
                                        </button>
                                        <button className="kpi-card" onClick={() => setFarmerSection("applications")}>
                                            <span className="kpi-label">APPROVED</span>
                                            <strong>{applications.filter(a => a.status === "APPROVED").length}</strong>
                                            <span className="kpi-link">View status →</span>
                                        </button>
                                    </div>

                                    <div className="executive-grid">
                                        <section className="executive-card">
                                            <div className="card-heading">
                                                <div>
                                                    <span className="eyebrow">FARM PROFILE</span>
                                                    <h3>Your farm at a glance</h3>
                                                </div>
                                                <button className="text-button" onClick={() => setFarmerSection("profile")}>View full profile</button>
                                            </div>
                                            {farmer ? (
                                                <div className="profile-summary-grid">
                                                    <div><span>Location</span><strong>{farmer.location}</strong></div>
                                                    <div><span>State</span><strong>{farmer.state}</strong></div>
                                                    <div><span>Crop</span><strong>{farmer.cropType}</strong></div>
                                                    <div><span>Land Area</span><strong>{formatAcres(farmer.landArea)}</strong></div>
                                                    <div><span>Language</span><strong>{farmer.preferredLanguage}</strong></div>
                                                </div>
                                            ) : <p className="muted">Loading farmer profile...</p>}
                                        </section>

                                        <section className="executive-card scheme-highlight">
                                            <div className="card-heading">
                                                <div>
                                                    <span className="eyebrow">OPPORTUNITIES</span>
                                                    <h3>Eligible schemes</h3>
                                                </div>
                                                <button className="text-button" onClick={() => setFarmerSection("schemes")}>View all</button>
                                            </div>
                                            {schemes.length === 0 ? (
                                                <p className="muted">No matched schemes are available at the moment.</p>
                                            ) : (
                                                schemes.slice(0, 3).map(scheme => (
                                                    <div className="mini-scheme" key={scheme.id}>
                                                        <div className="mini-scheme-mark">◆</div>
                                                        <div>
                                                            <strong>{scheme.name}</strong>
                                                            <span>{scheme.benefit}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </section>
                                    </div>
                                </>
                            )}

                            {farmerSection === "profile" && (
                                <section className="executive-card profile-page-card">
                                    <div className="profile-hero">
                                        <div className="large-profile-avatar">{(farmer?.name || "F").charAt(0).toUpperCase()}</div>
                                        <div>
                                            <span className="eyebrow">FARMER PROFILE</span>
                                            <h2>{farmer?.name || "Loading..."}</h2>
                                            <p>{farmer?.location || ""}, {farmer?.state || ""}</p>
                                        </div>
                                    </div>
                                    {farmer ? (
                                        <div className="detail-grid">
                                            <div><span>Full Name</span><strong>{farmer.name}</strong></div>
                                            <div><span>Phone</span><strong>{farmer.phone}</strong></div>
                                            <div><span>Preferred Language</span><strong>{farmer.preferredLanguage}</strong></div>
                                            <div><span>Location</span><strong>{farmer.location}</strong></div>
                                            <div><span>State</span><strong>{farmer.state}</strong></div>
                                            <div><span>Land Area</span><strong>{formatAcres(farmer.landArea)}</strong></div>
                                            <div><span>Primary Crop</span><strong>{farmer.cropType}</strong></div>
                                            <div><span>Account Username</span><strong>{loggedInUser.username}</strong></div>
                                        </div>
                                    ) : <p className="muted">Loading farmer profile...</p>}
                                </section>
                            )}

                            {farmerSection === "schemes" && (
                                <section className="executive-card page-section-card">
                                    <div className="card-heading">
                                        <div>
                                            <span className="eyebrow">PERSONALISED BENEFITS</span>
                                            <h2>Eligible Government Schemes</h2>
                                            <p>These schemes match the crop, land area and state in your profile.</p>
                                        </div>
                                        <button className="secondary-button" onClick={fetchSchemes}>Refresh</button>
                                    </div>

                                    {submissionMessage && (
                                        <div className={`submission-acknowledgement ${submissionMessage.type}`}>
                                            <div className="ack-icon">
                                                {submissionMessage.type === "success" ? "✓" : submissionMessage.type === "already" ? "!" : "!"}
                                            </div>
                                            <div>
                                                <h3>
                                                    {submissionMessage.type === "success"
                                                        ? "Application Submitted Successfully"
                                                        : submissionMessage.type === "already"
                                                            ? "Application Already Submitted"
                                                            : "Application Update"}
                                                </h3>
                                                <p>
                                                    {submissionMessage.type === "success" && (
                                                        <>Your application for <strong>{submissionMessage.schemeName}</strong> has been submitted successfully.</>
                                                    )}
                                                    {submissionMessage.type === "already" && (
                                                        <>You have already submitted an application for <strong>{submissionMessage.schemeName}</strong>. Application #{submissionMessage.applicationId} is already in your applications.</>
                                                    )}
                                                    {submissionMessage.type === "error" && submissionMessage.message}
                                                </p>
                                                {submissionMessage.type === "success" && submissionMessage.applicationId && (
                                                    <span className="ack-reference">Application ID: #{submissionMessage.applicationId}</span>
                                                )}
                                            </div>
                                            <button className="ack-close" onClick={() => setSubmissionMessage(null)} aria-label="Close acknowledgement">×</button>
                                        </div>
                                    )}

                                    {schemesLoading ? <p className="muted">Loading government schemes...</p> : schemes.length === 0 ? (
                                        <div className="empty-state"><strong>No eligible schemes found</strong><span>Update your profile or check again later for newly available programmes.</span></div>
                                    ) : (
                                        <div className="scheme-list scheme-stack">
                                            {schemes.map(scheme => (
                                                <div className="executive-scheme-card crop-scheme-card" key={scheme.id}>
                                                    <img
                                                        className="crop-scheme-image"
                                                        src={getSchemeImage(scheme)}
                                                        alt={`${scheme.name} agricultural photograph`}
                                                        onError={event => {
                                                            event.currentTarget.src = farmHeroImage;
                                                        }}
                                                    />
                                                    <div className="scheme-title-row">
                                                        <div>
                                                            <span className="scheme-code">GOVERNMENT PROGRAMME</span>
                                                            <h3>{scheme.name}</h3>
                                                        </div>
                                                        <span className="eligible-pill">ELIGIBLE</span>
                                                    </div>
                                                    <p>{scheme.description}</p>
                                                    <div className="scheme-meta-grid">
                                                        <div><span>Benefit</span><strong>{scheme.benefit}</strong></div>
                                                        <div><span>Target crop</span><strong>{scheme.targetCrop}</strong></div>
                                                        <div><span>Land range</span><strong>{scheme.minLandArea}–{scheme.maxLandArea} acres</strong></div>
                                                        <div><span>State</span><strong>{scheme.state}</strong></div>
                                                    </div>
                                                    <div className="scheme-actions">
                                                        <button className="secondary-button" onClick={() => checkEligibility(scheme.id, scheme.name)}>{eligibilityLoading ? "Checking..." : "View eligibility"}</button>
                                                        {(() => {
                                                            const alreadyApplied = applications.some(
                                                                application => String(application.schemeId) === String(scheme.id)
                                                            );
                                                            return (
                                                                <button
                                                                    className={`primary-button ${alreadyApplied ? "already-applied-button" : ""}`}
                                                                    onClick={() => applyForScheme(scheme.id, scheme.name)}
                                                                    disabled={alreadyApplied || (applicationLoading && applyingSchemeId === scheme.id)}
                                                                >
                                                                    {alreadyApplied
                                                                        ? "Already Submitted"
                                                                        : applicationLoading && applyingSchemeId === scheme.id
                                                                            ? "Submitting..."
                                                                            : "Apply now"}
                                                                </button>
                                                            );
                                                        })()}
                                                    </div>
                                                    {eligibility && eligibility.schemeName === scheme.name && (
                                                        <div className={`eligibility-result executive-eligibility ${eligibility.eligible ? "eligible" : "not-eligible"}`}>
                                                            <h4>{eligibility.eligible ? `You are eligible for ${scheme.name}` : `You are not eligible for ${scheme.name}`}</h4>
                                                            <ul>{eligibility.reasons?.map((reason, index) => <li key={index}>{reason}</li>)}</ul>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            )}

                            {farmerSection === "applications" && (
                                <section className="executive-card page-section-card">
                                    <div className="card-heading">
                                        <div>
                                            <span className="eyebrow">APPLICATION TRACKING</span>
                                            <h2>My Applications</h2>
                                            <p>Follow the progress of every government scheme application.</p>
                                        </div>
                                        <button className="secondary-button" onClick={fetchApplications}>Refresh</button>
                                    </div>
                                    {applications.length === 0 ? (
                                        <div className="empty-state"><strong>No applications submitted yet</strong><span>Explore eligible schemes to submit your first application.</span><button className="primary-button" onClick={() => setFarmerSection("schemes")}>Browse schemes</button></div>
                                    ) : (
                                        <div className="applications-list">
                                            {applications.map(application => {
                                                const status = application.status;
                                                const schemeName = getSchemeName(application.schemeId);
                                                return (
                                                    <div className="application-card application-tracking-card executive-application" key={application.id}>
                                                        <div className="application-card-header">
                                                            <div><span className="application-label">APPLICATION #{application.id}</span><h3>{schemeName}</h3></div>
                                                            <span className={`application-status status-${status.toLowerCase()}`}>{status.replace("_", " ")}</span>
                                                        </div>
                                                        <div className="farmer-application-details">
                                                            <span><strong>Farmer:</strong> {farmer?.name || loggedInUser?.username}</span>
                                                            <span><strong>Scheme:</strong> {schemeName}</span>
                                                        </div>
                                                        {application.notes && <p className="application-note">{application.notes}</p>}
                                                        {application.officerComment && (
                                                            <div className={`farmer-officer-comment ${status === "REJECTED" ? "rejected-comment" : "approved-comment"}`}>
                                                                <strong>{status === "REJECTED" ? "Reason for Rejection" : "Officer Comment"}</strong>
                                                                <p>{application.officerComment}</p>
                                                            </div>
                                                        )}
                                                        <div className="application-status-bar" aria-label={`Application status: ${status}`}>
                                                            <div className={`status-bar-step ${getApplicationStepState(status, 1)}`}>
                                                                <span className="status-bar-marker">{getApplicationStepState(status, 1) === "completed" ? "✓" : "1"}</span>
                                                                <strong>Application Submitted</strong>
                                                            </div>
                                                            <div className={`status-bar-connector ${getApplicationStepState(status, 2) !== "pending" ? "completed" : ""}`} />
                                                            <div className={`status-bar-step ${getApplicationStepState(status, 2)}`}>
                                                                <span className="status-bar-marker">{getApplicationStepState(status, 2) === "completed" ? "✓" : "2"}</span>
                                                                <strong>Under Review</strong>
                                                            </div>
                                                            <div className={`status-bar-connector ${getApplicationStepState(status, 3) !== "pending" ? "completed" : ""}`} />
                                                            <div className={`status-bar-step ${getApplicationStepState(status, 3)}`}>
                                                                <span className="status-bar-marker">{status === "REJECTED" ? "!" : status === "APPROVED" ? "✓" : "3"}</span>
                                                                <strong>{status === "REJECTED" ? "Rejected" : "Decision"}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </section>
                            )}

                            {farmerSection === "support" && (
                                <div className="support-grid support-page">
                                    <section className="executive-card support-hero-card">
                                        <img className="support-hero-image" src={assistanceImage} alt="Farmer Assistance Centre" />
                                        <span className="eyebrow">ASSISTANCE CENTRE</span>
                                        <h2>Clear guidance whenever you need it</h2>
                                        <p>Get clear, step-by-step guidance on scheme eligibility, applications, status updates and farmer profile information. The PalmWise assistance centre helps you understand what to do next and where to get support.</p>
                                        <div className="support-contact-card">
                                            <div><span>Customer Care</span><strong>PalmWise Farmer Assistance Desk</strong></div>
                                            <div><span>Toll-Free Number</span><strong>1800 4000 2222</strong></div>
                                            <div><span>Service Hours</span><strong>9:00 AM – 6:00 PM</strong></div>
                                        </div>
                                        <div className="support-actions">
                                            <button className="primary-button" onClick={() => setFarmerSection("schemes")}>Explore eligible schemes</button>
                                            <button className="secondary-button" onClick={() => setFarmerSection("applications")}>Check applications</button>
                                        </div>
                                    </section>
                                    <section className="executive-card support-list-card">
                                        <div className="support-list-title"><span className="eyebrow">HOW WE CAN HELP</span><h2>Assistance & guidance</h2></div>
                                        <div className="support-item"><div className="support-number">01</div><div><h3>Scheme eligibility</h3><p>Eligibility is matched using your registered state, crop and land area. Review your profile before applying so that the information used for matching is accurate.</p></div></div>
                                        <div className="support-item"><div className="support-number">02</div><div><h3>Application assistance</h3><p>Use My Applications to follow each submission from application received to review and final decision.</p></div></div>
                                        <div className="support-item"><div className="support-number">03</div><div><h3>Profile updates</h3><p>Keep your crop, land area, location, language and contact details updated for more accurate scheme matching.</p></div></div>
                                        <div className="support-social">
                                            <div className="support-social-title">Follow us</div>
                                            <div className="support-social-links">
                                                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><img src={facebookIcon} alt="Facebook" /><span>Facebook</span></a>
                                                <a href="https://twitter.com/" target="_blank" rel="noreferrer"><img src={xIcon} alt="Twitter / X" /><span>Twitter</span></a>
                                                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><img src={youtubeIcon} alt="YouTube" /><span>YouTube</span></a>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>
                    </section>
                )}

        </main>

    </div>
);
}

export default App;
