import React, { useState, useEffect } from 'react';

const defaultSlideImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80',
    alt: 'Malibu coastal architecture scenic',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80',
    alt: 'Luxurious coastal home with wood accents',
  },
];

const defaultPortfolioProjects = [
  {
    id: 1,
    title: 'Beachfront Modern House',
    description: 'Minimalistic design integrating indoor and outdoor living by the sea.',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Ocean View Interior',
    description:
      'Open-plan interiors designed to maximize natural light and panoramic ocean views.',
    image:
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8d5a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Coastal Elegance',
    description: 'Warm wooden elements create a welcoming atmosphere in this beachfront home.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80',
  },
];

const STORAGE_KEYS = {
  slides: 'malibuSlideImages',
  projects: 'malibuPortfolioProjects',
};

const MalibuArchitectureApp = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [slideImages, setSlideImages] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  // Load data from localStorage or use default data
  useEffect(() => {
    const storedSlides = localStorage.getItem(STORAGE_KEYS.slides);
    const storedProjects = localStorage.getItem(STORAGE_KEYS.projects);

    setSlideImages(storedSlides ? JSON.parse(storedSlides) : defaultSlideImages);
    setPortfolioProjects(storedProjects ? JSON.parse(storedProjects) : defaultPortfolioProjects);
  }, []);

  // Save updates of slide images
  const updateSlides = (newSlides) => {
    setSlideImages(newSlides);
    localStorage.setItem(STORAGE_KEYS.slides, JSON.stringify(newSlides));
  };

  // Save updates of portfolio projects
  const updateProjects = (newProjects) => {
    setPortfolioProjects(newProjects);
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(newProjects));
  };

  // Admin Panel Component
  const AdminPanel = () => {
    // For slides management
    const [slidesForm, setSlidesForm] = useState(slideImages);

    // For projects management
    const [projectsForm, setProjectsForm] = useState(portfolioProjects);

    const [newProject, setNewProject] = useState({
      title: '',
      description: '',
      image: '',
    });

    // Handle image upload for slide
    const handleSlideImageChange = (e, index) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedSlides = [...slidesForm];
        updatedSlides[index] = {
          ...updatedSlides[index],
          src: reader.result,
          alt: file.name,
        };
        setSlidesForm(updatedSlides);
      };
      reader.readAsDataURL(file);
    };

    // Add a new slide
    const addSlide = () => {
      setSlidesForm((prev) => [
        ...prev,
        { id: Date.now(), src: '', alt: 'New Slide Image' },
      ]);
    };

    // Remove a slide
    const removeSlide = (id) => {
      setSlidesForm((prev) => prev.filter((slide) => slide.id !== id));
    };

    // Handle change to slide alt text
    const handleSlideAltChange = (index, value) => {
      const updatedSlides = [...slidesForm];
      updatedSlides[index].alt = value;
      setSlidesForm(updatedSlides);
    };

    // Handle new project image upload
    const handleNewProjectImageChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    };

    // Handle new project input changes
    const handleNewProjectChange = (field, value) => {
      setNewProject((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

    // Add new project to list
    const addProject = () => {
      if (!newProject.title || !newProject.description || !newProject.image) {
        alert('لطفا همه فیلدهای پروژه جدید را پر کنید!');
        return;
      }
      const newProj = {
        ...newProject,
        id: Date.now(),
      };
      const updatedProjects = [newProj, ...projectsForm];
      setProjectsForm(updatedProjects);
      setNewProject({ title: '', description: '', image: '' });
    };

    // Remove project
    const removeProject = (id) => {
      const updatedProjects = projectsForm.filter((proj) => proj.id !== id);
      setProjectsForm(updatedProjects);
    };

    // Handle project field change
    const handleProjectFieldChange = (id, field, value) => {
      const updatedProjects = projectsForm.map((proj) => {
        if (proj.id === id) {
          return { ...proj, [field]: value };
        }
        return proj;
      });
      setProjectsForm(updatedProjects);
    };

    // Save all changes (slides and projects)
    const saveAll = () => {
      updateSlides(slidesForm);
      updateProjects(projectsForm);
      alert('تغییرات با موفقیت ذخیره شد!');
    };

    return (
      <>
        <style>{`
           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;700&display=swap');

          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #f6f8fa;
            color: #222;
          }
          h2 {
            color: #0e3c4f;
            margin-bottom: 0.5em;
            font-weight: 700;
            font-size: 2rem;
          }
          h3 {
            color: #0e3c4f;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }
          label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            color: #0e3c4f;
          }
          input[type="text"],
          textarea,
          input[type="file"] {
            width: 100%;
            padding: 10px 12px;
            margin-bottom: 15px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
          textarea {
            resize: vertical;
            min-height: 60px;
          }
          button {
            background: #0e3c4f;
            color: white;
            border: none;
            padding: 12px 22px;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.3s ease;
          }
          button:hover {
            background: #f7b733;
            color: #0e3c4f;
          }
          .container {
            max-width: 1000px;
            margin: 20px auto 50px;
            padding: 0 20px;
          }
          .toggle-btn {
            position: fixed;
            top: 16px;
            right: 16px;
            background: #0e3c4f;
            color: white;
            border: none;
            border-radius: 50px;
            padding: 10px 16px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 4px 14px rgb(0 0 0 / 0.3);
          }
          .section-box {
            background: white;
            border-radius: 12px;
            padding: 20px 25px;
            margin-bottom: 30px;
            box-shadow: 0 6px 15px rgb(0 0 0 / 0.1);
          }
          .slides-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }
          .slide-item {
            width: 180px;
            border: 1px solid #ccc;
            border-radius: 12px;
            padding: 10px;
            background: #fafafa;
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.05);
          }
          .slide-item img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 8px;
          }
          .slide-item input[type="text"] {
            margin-bottom: 5px;
          }
          .slide-item button {
            background: #e63946;
            padding: 6px 10px;
            font-size: 0.9rem;
            border-radius: 6px;
            box-shadow:none;
          }
          .slide-item button:hover {
            background: #a02732;
            color: white;
          }
          .projects-list {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }
          .project-item {
            border: 1px solid #ccc;
            border-radius: 12px;
            padding: 15px 20px;
            background: #fafafa;
            box-shadow: inset 0 1px 4px rgba(0,0,0,0.05);
            display: flex;
            gap: 15px;
            align-items: flex-start;
          }
          .project-item img {
            width: 140px;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
            flex-shrink: 0;
          }
          .project-info {
            flex: 1;
          }
          .project-info input[type="text"],
          .project-info textarea {
            margin-bottom: 8px;
          }
          .project-info textarea {
            height: 60px;
            font-size: 0.9rem;
          }
          .project-item button {
            background: #e63946;
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 0.9rem;
            box-shadow:none;
            align-self: flex-start;
            cursor: pointer;
          }
          .project-item button:hover {
            background: #a02732;
            color: white;
          }
          .new-project {
            margin-top: 20px;
            border: 1px solid #aaa;
            border-radius: 12px;
            padding: 20px;
            background: white;
            box-shadow: 0 4px 12px rgb(0 0 0 / 0.07);
          }
          .new-project h4 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #0e3c4f;
          }
          @media (max-width: 650px) {
            .slide-item {
              width: 100%;
            }
            .project-item {
              flex-direction: column;
              align-items: center;
            }
            .project-item img {
              width: 100%;
              height: auto;
            }
            .project-info {
              width: 100%;
            }
          }
        `}</style>

        <button className="toggle-btn" onClick={() => setIsAdmin(false)}>
          نمایش سایت
        </button>

        <div className="container" aria-label="پنل مدیریت سایت معماری مالیبو">
          <h2>پنل مدیریت سایت</h2>

          <section className="section-box" aria-label="مدیریت تصاویر اسلایدشو">
            <h3>تصاویر اسلایدشو</h3>
            <button onClick={addSlide} aria-label="افزودن تصویر اسلاید جدید">+ افزودن تصویر</button>
            <div className="slides-list">
              {slidesForm.map((slide, index) => (
                <div className="slide-item" key={slide.id}>
                  {slide.src ? (
                    <img src={slide.src} alt={slide.alt || 'slide image'} />
                  ) : (
                    <div style={{height:'100px',background:'#ddd',borderRadius:'8px',marginBottom:'8px',display:'flex',justifyContent:'center',alignItems:'center'}}>بدون تصویر</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSlideImageChange(e, index)}
                    aria-label={`آپلود تصویر اسلاید شماره ${index + 1}`}
                  />
                  <input
                    type="text"
                    placeholder="متن جایگزین تصویر (alt)"
                    value={slide.alt}
                    onChange={(e) => handleSlideAltChange(index, e.target.value)}
                    aria-label={`متن جایگزین تصویر اسلاید شماره ${index + 1}`}
                  />
                  <button
                    onClick={() => removeSlide(slide.id)}
                    aria-label={`حذف تصویر اسلاید شماره ${index + 1}`}
                  >حذف</button>
                </div>
              ))}
            </div>
          </section>

          <section className="section-box" aria-label="مدیریت پروژه های نمونه">
            <h3>نمونه پروژه‌ها</h3>

            <div className="projects-list">
              {projectsForm.map((proj) => (
                <div className="project-item" key={proj.id}>
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} />
                  ) : (
                    <div style={{width:'140px',height:'100px',background:'#ddd',borderRadius:'8px',marginBottom:'8px',flexShrink:0,display:'flex',justifyContent:'center',alignItems:'center'}}>بدون تصویر</div>
                  )}
                  <div className="project-info">
                    <label htmlFor={'title-' + proj.id}>عنوان پروژه</label>
                    <input
                      id={'title-' + proj.id}
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleProjectFieldChange(proj.id, 'title', e.target.value)}
                    />

                    <label htmlFor={'desc-' + proj.id}>توضیحات</label>
                    <textarea
                      id={'desc-' + proj.id}
                      value={proj.description}
                      onChange={(e) => handleProjectFieldChange(proj.id, 'description', e.target.value)}
                    />
                  </div>
                  <button onClick={() => removeProject(proj.id)} aria-label={`حذف پروژه ${proj.title}`}>
                    حذف
                  </button>
                </div>
              ))}
            </div>

            <div className="new-project" aria-label="اضافه کردن پروژه جدید">
              <h4>افزودن پروژه جدید</h4>
              <label htmlFor="new-project-title">عنوان پروژه</label>
              <input
                id="new-project-title"
                type="text"
                value={newProject.title}
                onChange={(e) => handleNewProjectChange('title', e.target.value)}
                placeholder="عنوان پروژه"
              />

              <label htmlFor="new-project-desc">توضیحات</label>
              <textarea
                id="new-project-desc"
                value={newProject.description}
                onChange={(e) => handleNewProjectChange('description', e.target.value)}
                placeholder="توضیحات پروژه"
              />

              <label htmlFor="new-project-image">تصویر پروژه</label>
              <input
                id="new-project-image"
                type="file"
                accept="image/*"
                onChange={handleNewProjectImageChange}
              />
              {newProject.image && (
                <img
                  src={newProject.image}
                  alt="Preview پروژه جدید"
                  style={{width:'120px', height:'80px', borderRadius:'8px', marginTop:'8px', objectFit:'cover'}}
                />
              )}

              <button onClick={addProject} aria-label="افزودن پروژه جدید">افزودن پروژه</button>
            </div>
          </section>

          

          <button onClick={saveAll} aria-label="ذخیره همه تغییرات">ذخیره تغییرات</button>
        </div>
      </>
    );
  };

  // Hero slideshow component
  const HeroSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slideImages.length);
      }, 6000);
      return () => clearInterval(interval);
    }, [slideImages.length]);

    if (slideImages.length === 0) {
      return (
        <section
          className="hero"
          aria-label="Hero section with no images"
          style={{
            height: '90vh',
            background: '#0e3c4f',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <h2>Malibu Architecture</h2>
        </section>
      );
    }

    return (
      <section
        className="hero"
        aria-label="Hero slideshow"
        style={{
          position: 'relative',
          height: '90vh',
          overflow: 'hidden',
          borderRadius: '0 0 80px 80px / 0 0 60px 60px',
        }}
      >
        {slideImages.map((slide, idx) => (
          <img
            key={slide.id}
            src={slide.src}
            alt={slide.alt || 'slide image'}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '90vh',
              objectFit: 'cover',
              opacity: currentIndex === idx ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: currentIndex === idx ? 5 : 1,
            }}
          />
        ))}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            color: 'white',
            textShadow: '0 4px 10px rgba(0,0,0,0.8)',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 20px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '3.4rem',
              marginBottom: '0.3em',
              fontWeight: '700',
              letterSpacing: '3px',
              maxWidth: '900px',
            }}
          >
            Innovative Designs<br />for Coastal Living
          </h2>
          <p style={{ fontSize: '1.3rem', maxWidth: '650px', fontWeight: '300', lineHeight: 1.5 }}>
            Crafting timeless architecture in Malibu, California
          </p>
        </div>
      </section>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #f4f7f6;
          color: #222;
        }
        section.team {
    padding: 3rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
}
section.team h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #1e3c72;
    font-weight: 800;
}
.team-members {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
}
.member-card {
    background: #fff;
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
    border-radius: 12px;
    width: 260px;
    padding: 1rem 1.2rem 2rem 1.2rem;
    text-align: center;
    transition: transform 0.3s ease;
    cursor: default;
}
.member-card:hover {
    transform: translateY(-7px);
    box-shadow: 0 14px 40px rgb(0 0 0 / 0.25);
}
.member-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 4px solid #1e3c72;
}
.member-name {
    font-weight: 700;
    font-size: 1.25rem;
    margin: 0.5rem 0 0.2rem 0;
    color: #2a5298;
    user-select: text;
}
.member-role {
    color: #555;
    font-size: 1rem;
    font-style: italic;
    user-select: text;
}

        a {
          text-decoration: none;
          color: inherit;
        }

        header {
          background: #0e3c4f;
          color: #fff;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
        }

        header h1 {
          font-weight: 600;
          letter-spacing: 2px;
          font-size: 1.8rem;
          cursor: default;
        }

        nav a {
          margin-left: 30px;
          font-weight: 600;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        nav a:hover {
          color: #f7b733;
        }

        section.about {
          max-width: 1000px;
          margin: 60px auto 40px;
          padding: 0 20px;
          text-align: center;
          color: #0e3c4f;
        }

        section.about h3 {
          font-weight: 600;
          font-size: 2rem;
          margin-bottom: 1rem;
          letter-spacing: 1.2px;
        }

        section.about p {
          font-weight: 300;
          font-size: 1.1rem;
          line-height: 1.7;
          max-width: 720px;
          margin: 0 auto;
        }

        section.portfolio {
          background: #eef2f3;
          padding: 60px 20px 80px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        section.portfolio h3 {
          text-align: center;
          color: #0e3c4f;
          font-weight: 600;
          font-size: 2rem;
          margin-bottom: 2rem;
          letter-spacing: 1.2px;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
          gap: 20px;
        }

        .project-card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.15);
        }

        .project-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .project-info {
          padding: 15px 20px;
          flex-grow: 1;
        }

        .project-info h4 {
          margin: 0 0 8px;
          color: #0e3c4f;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .project-info p {
          font-weight: 300;
          font-size: 0.9rem;
          color: #555;
          margin: 0;
          line-height: 1.4;
        }

        section.services {
          max-width: 1000px;
          margin: 0 auto 80px;
          padding: 0 20px;
          text-align: center;
        }

        section.services h3 {
          font-weight: 600;
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #0e3c4f;
          letter-spacing: 1.2px;
        }

        .services-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 25px;
        }

        .service-item {
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          padding: 25px 20px;
          width: 280px;
          transition: box-shadow 0.3s ease;
          font-weight: 400;
        }

        .service-item:hover {
          box-shadow: 0 12px 22px rgba(0,0,0,0.15);
        }

        .service-item h4 {
          margin-bottom: 10px;
          color: #0e3c4f;
          font-weight: 600;
          font-size: 1.2rem;
        }

        section.contact {
          background: #0e3c4f;
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        section.contact h3 {
          font-weight: 600;
          font-size: 2rem;
          margin-bottom: 1rem;
          letter-spacing: 1.2px;
        }

        form {
          margin-top: 30px;
          max-width: 460px;
          margin-left: auto;
          margin-right: auto;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        input, textarea {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 20px;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
        }

        textarea {
          resize: vertical;
          min-height: 100px;
        }

        button {
          background: #f7b733;
          border: none;
          padding: 14px 40px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1.1rem;
          color: #0e3c4f;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
        }

        button:hover {
          background: #e0a520;
          color: white;
        }

        footer {
          text-align: center;
          padding: 25px 15px;
          color: #666;
          font-size: 0.9rem;
          background: #192a37;
        }

        @media (max-width: 720px) {
          nav a {
            margin-left: 15px;
            font-size: 0.9rem;
          }

          section.hero h2 {
            font-size: 2.4rem;
          }
          section.hero p {
            font-size: 1rem;
          }
        }
      `}</style>

      {/*<button
        className="toggle-btn"
        onClick={() => setIsAdmin((prev) => !prev)}
        aria-label={isAdmin ? 'نمایش سایت' : 'ورود به پنل مدیریت'}
      >
        {isAdmin ? 'نمایش سایت' : 'ورود به پنل مدیریت'}
      </button>*/}

      {isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          <header>
            <h1>Malibu Architecture</h1>
            <nav>
              <a href="#about">About</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </nav>
          </header>

          <HeroSlideshow />

          <section id="about" className="about" aria-label="About Malibu Architecture">
            <h3>About Us</h3>
            <p>
              Malibu Architecture is a premier architectural design firm located in the heart of Malibu, California.
              We specialize in creating bespoke coastal homes and commercial spaces that blend sophisticated design with the natural beauty of the oceanfront.
              Our passion lies in transforming visions into elegant, sustainable, and functional environments.
            </p>
          </section>

          <section id="portfolio" className="portfolio" aria-label="Portfolio of Architectural Projects">
            <h3>Our Portfolio</h3>
            <div className="projects-grid">
              {portfolioProjects.map((project) => (
                <article className="project-card" tabIndex="0" key={project.id}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-info">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section class="team" id="team" aria-label="Company team">
    <h2 tabindex="0">Our Team</h2>
    <div class="team-members">
      <div class="member-card" tabindex="0" role="group" aria-labelledby="member1-name" aria-describedby="member1-role">
        <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Photo of Lila Hosseini, Project Manager" class="member-photo" />
        <h3 class="member-name" id="member1-name">Lila Hosseini</h3>
        <p class="member-role" id="member1-role">Project Manager & Lead Architect</p>
      </div>
      <div class="member-card" tabindex="0" role="group" aria-labelledby="member2-name" aria-describedby="member2-role">
        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Photo of Reza Ahmadi, Structural Engineer" class="member-photo" />
        <h3 class="member-name" id="member2-name">Reza Ahmadi</h3>
        <p class="member-role" id="member2-role">Structural Engineer</p>
      </div>
      <div class="member-card" tabindex="0" role="group" aria-labelledby="member3-name" aria-describedby="member3-role">
        <img src="https://randomuser.me/api/portraits/women/47.jpg" alt="Photo of Mahsa Abbasi, Interior Designer" class="member-photo" />
        <h3 class="member-name" id="member3-name">Mahsa Abbasi</h3>
        <p class="member-role" id="member3-role">Interior Designer</p>
      </div>
    </div>
  </section>

          <section id="services" className="services" aria-label="Services offered by Malibu Architecture">
            <h3>Our Services</h3>
            <div className="services-list">
              <div className="service-item" tabIndex="0">
                <h4>Residential Design</h4>
                <p>Custom luxury homes designed to harmonize with Malibu’s coastal landscape.</p>
              </div>
              <div className="service-item" tabIndex="0">
                <h4>Commercial Projects</h4>
                <p>Modern and sustainable commercial spaces tailored to client needs.</p>
              </div>
              <div className="service-item" tabIndex="0">
                <h4>Interior Architecture</h4>
                <p>Creating functional, stylish interiors that complement architectural vision.</p>
              </div>
              <div className="service-item" tabIndex="0">
                <h4>Consultation & Planning</h4>
                <p>Expert advice and project planning from concept through completion.</p>
              </div>
            </div>
          </section>

          <section id="contact" className="contact" aria-label="Contact Malibu Architecture">
            <h3>Contact Us</h3>
            <form onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your full name" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="your.email@example.com" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Write your message here..." required />
              
              <button type="submit" aria-label="Send message to Malibu Architecture">Send Message</button>
            </form>
          </section>

          <footer>
            &copy; {new Date().getFullYear()} Malibu Architecture. Designed with care in Malibu, California.
          </footer>
        </>
      )}
    </>
  );
};

export default MalibuArchitectureApp;

