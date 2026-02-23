/**
 * ╔══════════════════════════════════════════════════════╗
 *  UNTOLDsuri — SITE CONFIG
 *  Edit this file to update ALL website content.
 *  No HTML or JS knowledge needed.
 * ╚══════════════════════════════════════════════════════╝
 */

window.SITE = {

    /* ─────────────────────────── BRAND ─────────────────────── */
    brand: {
        name: 'UNTOLDsuri',
        logo: 'Logo/logo.jpg',
        tagline: "Documenting Barak Valley's Forgotten History",
        subtext: 'Independent documentary storytelling through research, visuals, and truth.',
        footerQuote: '"History fades when it is not recorded."',
        copyright: '2026 UNTOLDsuri. All rights reserved.',
        credits: [
            { name: 'SAHIL', link: 'https://www.instagram.com/finding.sahil' },
            { name: 'SUBHAJYOTI', link: 'https://www.instagram.com/subhajyot.i/' }
        ]
    },

    /* ─────────────────────────── NAV LINKS ─────────────────── */
    nav: [
        { label: 'Home', href: 'index.html' },
        { label: 'About', href: 'about.html' },
        { label: 'Works', href: 'works.html' },
        { label: 'Gallery', href: 'gallery.html' },
        { label: 'Archive', href: 'archive.html' },
        { label: 'Achievements', href: 'achievements.html' },
        { label: 'Team', href: 'team.html' },
        { label: 'Contact', href: 'contact.html' },
    ],

    /* ─────────────────────────── SOCIAL LINKS ──────────────── */
    links: {
        youtube: 'https://www.youtube.com/@UNTOLDsuri',
        instagram: 'https://www.instagram.com/untoldsuri',
        facebook: 'https://www.facebook.com/untoldsuri',
        email: 'untoldsuri@gmail.com',
    },

    /* ─────────────────────────── PLATFORMS SECTION ─────────── */
    platforms: [
        {
            name: 'YouTube',
            desc: 'Documentary Films',
            href: 'https://www.youtube.com/@UNTOLDsuri',
            icon: 'youtube',
        },
        {
            name: 'Instagram',
            desc: 'Reels & Carousels',
            href: 'https://www.instagram.com/untoldsuri',
            icon: 'instagram',
        },
        {
            name: 'Facebook',
            desc: 'Page & Community',
            href: 'https://www.facebook.com/untoldsuri',
            icon: 'facebook',
        },
    ],

    /* ─────────────────────────── ABOUT SECTION ─────────────── */
    about: [
        'UNTOLDsuri is an independent documentary project dedicated to recovering and recording the histories of Barak Valley — stories that never made it into textbooks, archives, or mainstream discourse. We work through primary research, field interviews, archival material, and careful narration to bring these histories into the open.',
        'Our approach is methodical and unhurried. We do not sensationalise. We do not speculate beyond evidence. Every piece of content is built on documented sources, cross-referenced accounts, and honest acknowledgment of what remains uncertain. Truth-first documentation is not a tagline — it is the operating principle behind every frame we produce.',
        'Starting with Barak Valley, the project aims to expand gradually into the broader, often overlooked corners of Indian historical memory.',
    ],

    /* ─────────────────────────── FEATURED WORKS ────────────── */
    /*
     * platform: 'instagram' | 'youtube'
     * embedUrl: Instagram reel embed URL (add /embed/ to the reel link)
     *           YouTube: https://www.youtube.com/embed/VIDEO_ID
     * badge:    label shown on the card
     */
    works: [
        {
            title: 'Recent Release',
            desc: 'Our latest short-form documentary content.',
            platform: 'instagram',
            badge: 'Instagram',
            url: 'https://www.instagram.com/reel/DUu-W_Okf9D/',
            thumbnail: 'assets/img/work-1.jpg',
            alt: 'Recent UNTOLDsuri Instagram reel documentary about Barak Valley'
        },
        {
            title: 'Barak Valley Chronicles',
            desc: 'A visual record of forgotten settlements along the Barak river.',
            platform: 'instagram',
            badge: 'Instagram',
            url: 'https://www.instagram.com/reel/DSpCX__kTBX/',
            thumbnail: 'assets/img/work-2.jpg',
            alt: 'Documentary reel showing forgotten settlements along the Barak River'
        },
        {
            title: 'Historical Documentation',
            desc: 'Field research and archival footage from Cachar district.',
            platform: 'instagram',
            badge: 'Instagram',
            url: 'https://www.instagram.com/reel/DSe86ffkaC_/',
            thumbnail: 'assets/img/work-3.jpg',
            alt: 'Archive footage and field research from Cachar district historical archive'
        },
        {
            title: 'Archive Reel',
            desc: 'Documenting structures and stories before they are lost.',
            platform: 'instagram',
            badge: 'Instagram',
            url: 'https://www.instagram.com/reel/DSXUnZekcKv/',
            thumbnail: 'assets/img/work-1.jpg',
            alt: 'Archival documentation of historical structures in Barak Valley'
        }
    ],

    /* ─────────────────────────── RESEARCH SECTION ──────────── */
    research: {
        topics: [
            'Partition displacement in Barak Valley (1947)',
            'Pre-colonial land records of Cachar',
            'The Language Movement of 1961 — local accounts',
            'Migration patterns along the Barak river corridor',
            'Oral history preservation methodology',
            'Colonial administrative maps vs. living geography',
        ],
        places: [
            'Itakhola Fort, Cachar',
            'Khaspur — former capital of the Cachar Kingdom',
            'Badarpur Junction — a century of transit history',
            'Old Silchar market district (pre-1950s)',
            'Submerged villages of the Barak floodplain',
            "Hailakandi's colonial-era courthouses",
        ],
        ongoing: [
            { label: 'Cachar Kingdom — Documentary (in production)', active: true },
            { label: '1961 Language Martyrs — Field interviews', active: true },
            { label: 'Barak river ecology & settlement history', active: false },
            { label: 'Unreported temples survey — Karimganj', active: false },
        ],
    },

    /* ─────────────────────────── ACHIEVEMENTS HERO ──────────── */
    achievementsHero: {
        preTitle: "Our Milestones",
        titleMain: "Proof of",
        titleHighlight: "Impact",
        desc: "Numbers, awards, and recognition — what two years of relentless storytelling looks like."
    },

    /* ─────────────────────────── ACHIEVEMENTS ───────────────── */
    achievements: [
        {
            year: '2025',
            title: 'Best Regional Documentary',
            event: 'Assam Film Awards',
            desc: 'Recognized for "The River of Silence" – documenting the lost trade routes of the Barak Valley.'
        },
        {
            year: '2024',
            title: 'Digital Preservation Grant',
            event: 'Regional Heritage Fund',
            desc: 'Awarded for the development of the Barak Valley primary source digital archive.'
        },
        {
            year: '2024',
            title: '1M+ Collective Views',
            event: 'Social Impact Milestone',
            desc: 'Reached a cumulative audience of over one million across YouTube and Instagram.'
        }
    ],

    /* ─────────────────────────── TEAM ──────────────────────── */
    /*
     * photo: path to image file, e.g. 'assets/img/team-name.jpg'
     *        Leave as '' to show the default avatar placeholder.
     */
    team: [
        {
            name: '— Sushmita Sarkar —',
            role: 'Founder & Director',
            bio: 'Coordinates primary research, field documentation, and editorial flow. Leads archival investigations across Barak Valley.',
            photo: 'assets/img/Sushmita.jpeg',
            socials: { instagram: 'https://instagram.com/untoldsuri', facebook: 'https://facebook.com/untoldsuri', linkedin: '#' }
        },
        {
            name: '— Tushar Sarkar —',
            role: 'Founder & Director',
            bio: 'Handles technical strategy, platform outreach, and the structural documentation of historical data.',
            photo: 'assets/img/Tushar.jpeg',
            socials: { instagram: 'https://instagram.com/untoldsuri', facebook: 'https://facebook.com/untoldsuri', linkedin: '#' }
        },
        {
            name: '— Sahil —',
            role: 'Editor & Developer',
            bio: 'Oversees project operations and structural workflow. Instrumental in conceptualising the archive framework.',
            photo: 'assets/img/Sahil.png',
            socials: { instagram: 'https://instagram.com/finding.sahil', facebook: '#', linkedin: '#' }
        },
        {
            name: '— Subhajyoti —',
            role: 'Narrator & Writer',
            bio: 'Crafts the documentary narration and editorial content. Ensures accuracy and clarity of voice.',
            photo: '',
            socials: { instagram: 'https://www.instagram.com/subhajyot.i/', facebook: '#', linkedin: '#' }
        },
        {
            name: '— Ananya —',
            role: 'Narrator & Writer',
            bio: 'Crafts the documentary narration and editorial content. Ensures accuracy and clarity of voice.',
            photo: '',
            socials: { instagram: 'https://www.instagram.com/subhajyot.i/', facebook: '#', linkedin: '#' }
        },
        /*{
            name: '— Visit the Archive —',
            role: 'Become a Contributor',
            bio: 'We are looking for field researchers and writers to help us document more untold stories of Barak Valley.',
            photo: '',
            socials: { instagram: 'https://instagram.com/untoldsuri', facebook: '#', linkedin: '#' }
        }, */
    
    ],

    /* ─────────────────────────── ARCHIVAL GALLERY ─────────── */
    gallery: [
        {
            title: 'Silchar Ghat, 1920s',
            desc: 'Archival record of river trade and commerce along the Barak.',
            img: 'assets/img/gallery-1.jpg',
            alt: 'Historical photo of Silchar Ghat in the 1920s showing river trade'
        },
        {
            title: 'Tea Estate Bungalow',
            desc: 'Colonial-era architecture in the lush hills of Cachar.',
            img: 'assets/img/gallery-2.jpg',
            alt: 'Colonial-era architecture of a tea estate bungalow in Cachar'
        },
        {
            title: 'Old Badarpur Bridge',
            desc: 'A critical transport link dating back to the late 19th century.',
            img: 'assets/img/work-3.jpg',
            alt: 'Historical view of the old Badarpur Bridge transport link'
        },
        {
            title: 'Royal Gate, Khaspur',
            desc: 'Remaining structure of the Dimasa Kachari Kingdom capital.',
            img: 'assets/img/work-1.jpg',
            alt: 'Archival image of the Royal Gate at Khaspur, Dimasa Kachari Kingdom'
        }
    ],

    /* ─────────────────────────── RESEARCH MAP ───────────────── */
    map: {
        title: 'Geographic Documentation',
        desc: 'Key locations in Barak Valley currently under archival research.',
        pins: [
            { name: 'Khaspur', x: '45%', y: '30%', status: 'Documented' },
            { name: 'Badarpur', x: '25%', y: '50%', status: 'Researching' },
            { name: 'Silchar', x: '55%', y: '55%', status: 'Documented' },
            { name: 'Karimganj', x: '15%', y: '65%', status: 'Planned' },
            { name: 'Hailakandi', x: '40%', y: '75%', status: 'Researching' }
        ]
    },

    /* ─────────────────────────── SUGGESTIONS & MESSAGES ────── */
    newsletter: {
        title: 'Send a Message',
        desc: 'Share your suggestions, historical insights, or archival requests with our team.',
        placeholder: 'Enter your email address'
    },


    /* ─────────────────────────── CONTACT SECTION ───────────── */
    contact: {
        body: [
            'We welcome serious inquiries from educational institutions, historians, archivists, and documentary organisations who share an interest in preserving regional history. If you have access to primary sources, oral accounts, or documented material related to Barak Valley or Indian history more broadly, we would be glad to hear from you.',
            'We are also open to marketing partnerships, sponsorships, and brand collaborations that align with our values of honest storytelling and regional heritage. If you are interested in working with us, we would love to hear from you.',
        ],
    },

    /* ─────────────────────────── FAQ SECTION ───────────────── */
    faq: [
        {
            q: "What is the primary focus of UNTOLDsuri?",
            a: "We focus on documenting the undocumented. Our primary mission is to record the lost or forgotten histories of the Barak Valley through meticulous research and cinematic storytelling."
        },
        {
            q: "How can I contribute to the archive?",
            a: "If you have archival photographs, primary documents, or oral histories related to Barak Valley, please reach out via our contact page. We credit all contributors."
        },
        {
            q: "Is the research verified?",
            a: "Yes. Every piece of content is built on cross-referenced sources, archival records, and expert consultation. We prioritize historical accuracy above all else."
        },
        {
            q: "Can I use your footage for educational purposes?",
            a: "Please contact us for licensing and usage rights. We generally support educational use if proper attribution is provided."
        }
    ],

};
