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
        developer: {
            name: 'SAHIL',
            link: 'https://www.instagram.com/finding.sahil'
        }
    },

    /* ─────────────────────────── NAV LINKS ─────────────────── */
    nav: [
        { label: 'About', href: '#about' },
        { label: 'Platforms', href: '#platforms' },
        { label: 'Works', href: '#works' },
        { label: 'Research', href: '#research' },
        { label: 'Team', href: '#team' },
        { label: 'Contact', href: '#contact' },
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
        },
        {
            title: 'Barak Valley Chronicles',
            desc: 'A visual record of forgotten settlements along the Barak river.',
            platform: 'instagram',
            badge: 'Instagram',
            url: 'https://www.instagram.com/reel/DSpCX__kTBX/',
            thumbnail: 'assets/img/work-2.jpg',
        },
        {
            title: 'Historical Documentation',
            desc: 'Field research and archival footage from Cachar district.',
            platform: 'instagram',
            badge: 'Instagram',
            url: 'https://www.instagram.com/reel/DSe86ffkaC_/',
            thumbnail: 'assets/img/work-3.jpg',
        },
        {
            title: 'Archive Reel',
            desc: 'Documenting structures and stories before they are lost.',
            platform: 'instagram',
            badge: 'Instagram',
            url: 'https://www.instagram.com/reel/DSXUnZekcKv/',
            thumbnail: 'assets/img/work-1.jpg',
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

    /* ─────────────────────────── TEAM ──────────────────────── */
    /*
     * photo: path to image file, e.g. 'assets/img/team-name.jpg'
     *        Leave as '' to show the default avatar placeholder.
     */
    team: [
        {
            name: '— Update Name —',
            role: 'Historian & Director',
            bio: 'Leads primary research and historical narration. Archives primary sources from the Barak Valley region.',
            photo: '',
        },
        {
            name: '— Update Name —',
            role: 'Field Researcher',
            bio: 'Conducts field interviews, location surveys, and cross-references oral accounts with documented records.',
            photo: '',
        },
        {
            name: '— Update Name —',
            role: 'Narrator & Writer',
            bio: 'Crafts the documentary narration and editorial content. Ensures accuracy and clarity of voice.',
            photo: '',
        },
        {
            name: '— Update Name —',
            role: 'Visual Editor',
            bio: 'Handles post-production, visual composition, and the cinematic presentation of research material.',
            photo: '',
        },
    ],

    /* ─────────────────────────── CONTACT SECTION ───────────── */
    contact: {
        body: [
            'We welcome serious inquiries from educational institutions, historians, archivists, and documentary organisations who share an interest in preserving regional history. If you have access to primary sources, oral accounts, or documented material related to Barak Valley or Indian history more broadly, we would be glad to hear from you.',
            'We are also open to marketing partnerships, sponsorships, and brand collaborations that align with our values of honest storytelling and regional heritage. If you are interested in working with us, we would love to hear from you.',
        ],
    },

};
