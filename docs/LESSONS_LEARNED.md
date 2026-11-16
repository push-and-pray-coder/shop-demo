# Lessons Learned
- Identify technical dependencies during project planning to prevent development delays and unnecessary rework. For example, implementing featured categories on the Home Page required a backend Category model that had not yet been developed.
- **Prioritize tasks using business value, dependencies, risk, and effort.** Consider established frameworks such as **Weighted Shortest Job First (WSJF)**:

  **WSJF = (Business Value + Time Criticality + Risk Reduction) ÷ Job Size**

  Higher scores indicate higher priority, but technical dependencies must also be considered. For example, Shop Demo's Product Catalog should have preceded the Home Page because it delivers core functionality and supports other features.
  **Avoid storing temporary URLs or redundant data. AWS S3 signed URLs expire, causing saved cart images to break. Store only product IDs and quantities in localStorage, then retrieve current product information and fresh image URLs from Django. This also ensures prices and product details remain up to date without making S3 images public.