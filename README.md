
# Prison Education & Recidivism Analysis

##  Project Overview
This project explores the relationship between prison education programs and recidivism rates. Because direct participation data in education programs wasn't available in the primary dataset, post-release employment was used as a proxy for successful program participation. The analysis uses simulated data modeled after trends in Bureau of Justice Statistics (BJS) reports.

##  Methodology
- Simulated a dataset with 1,000 observations using key indicators: post-release employment, violent offense history, and time served.
- Used logistic regression to model the likelihood of recidivism based on these predictors.
- Generated charts and coefficient plots to visualize key findings.

##  Folder Structure
```
.
├── data/                  # Simulated dataset (CSV)
├── notebooks/             # Jupyter notebook with full analysis
├── outputs/               # Plots and result visuals
├── reports/               # Final report and presentation slides
├── requirements.txt       # Python dependencies
└── README.md              # Project documentation
```

## Reproducibility
To run this project:
1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
3. Open the notebook:
   ```
   cd notebooks
   jupyter notebook final_analysis.ipynb
   ```

##  Key Results
- Employment after release significantly lowers the odds of recidivism.
- Violent offenses increase the likelihood of reoffending.
- Time served had no meaningful impact in the simulation.

##  Project Files
-  [Final Report (PDF)](./reports/Sprint3_Final_Report.pdf)
-  [Presentation Slides (PDF)](./reports/Sprint4_Presentation_Slides.pdf)
- [Notebook](./notebooks/final_analysis.ipynb)
-  [Visual Outputs](./outputs)

##  Author
Michael Parham  
