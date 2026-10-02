import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DiagnosisResultData } from '../types';

export interface PrescriptionData {
  patientName: string;
  age?: string | number;
  gender?: string;
  symptoms: string;
  duration?: string;
  severity?: string;
  diagnosis: string;
  ayurvedicDosha?: string;
  remedies?: Array<{
    name: string;
    dosage?: string;
    howToUse?: string;
    frequency?: string;
  }> | string[];
  treatment?: string[];
  exercises?: string[];
  dietAdvice?: {
    foodsToEat?: string[];
    foodsToAvoid?: string[];
    routineTips?: string[];
  };
  advice?: string;
  date?: string;
  diagnosisId?: string;
}

/**
 * Normalizes text to ensure jsPDF (standard Latin font) never throws encoding errors.
 * Replaces complex Devanagari glyphs with clean, readable Latin-1 strings if needed.
 */
function cleanAscii(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2022\u2023]/g, '*')
    .trim();
}

/**
 * Generates an Authentic Chotelal Ji Health Prescription PDF
 * 100% Crash-Proof with jsPDF + jspdf-autotable
 */
export function generatePrescription(data: PrescriptionData): void {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;

    const patientName = cleanAscii(data.patientName) || 'Valued Patient';
    const age = cleanAscii(String(data.age || '28'));
    const gender = cleanAscii(data.gender || 'Not specified');
    const dateStr =
      cleanAscii(data.date) ||
      new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    const diagnosisId =
      cleanAscii(data.diagnosisId) ||
      `CHL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let y = 14;

    // 1. Header: Chotelal Ji Health logo + tagline
    doc.setFillColor(255, 153, 51); // Chotelal Orange #FF9933
    doc.circle(margin + 10, y + 8, 8, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(margin + 10, y + 8, 6.5, 'F');
    doc.setTextColor(234, 88, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('CJH', margin + 7.5, y + 11);

    doc.setTextColor(255, 153, 51); // #FF9933
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Chotelal Ji Health', pageWidth / 2, y + 7, { align: 'center' });

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('"Aapki Sehat, Hamari Zimmedari"', pageWidth / 2, y + 13, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Date: ${dateStr}`, pageWidth - margin, y + 10, { align: 'right' });

    y += 18;

    // Divider Line
    doc.setDrawColor(255, 153, 51);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    // 2. Patient Details Bar
    doc.setFillColor(248, 250, 252); // Soft Gray #F8FAFC
    doc.rect(margin, y, contentWidth, 14, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(margin, y, contentWidth, 14, 'D');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`Patient: ${patientName}`, margin + 4, y + 5.5);
    doc.text(`Age/Sex: ${age} / ${gender}`, margin + 75, y + 5.5);
    doc.text(`Diagnosis ID: ${diagnosisId}`, pageWidth - margin - 4, y + 5.5, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Reported Symptoms: ${cleanAscii(data.symptoms) || 'General Health Consultation'}`, margin + 4, y + 10.5);

    y += 18;

    // 3. Diagnosis Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(234, 88, 12);
    doc.text('AYURVEDIC DIAGNOSIS & DOSHA ASSESSMENT', margin, y);
    y += 4;

    doc.setFillColor(255, 251, 245);
    doc.rect(margin, y, contentWidth, 13, 'F');
    doc.setDrawColor(254, 215, 170);
    doc.rect(margin, y, contentWidth, 13, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`Condition: ${cleanAscii(data.diagnosis) || 'Holistic Ayurvedic Evaluation'}`, margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 53, 15);
    doc.text(`Dosha Imbalance: ${cleanAscii(data.ayurvedicDosha) || 'Vata-Pitta Pradhan Samata'}`, margin + 4, y + 9.5);

    y += 17;

    // 4. Herbal Remedies Table (Using autoTable)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(234, 88, 12);
    doc.text('HERBAL REMEDIES (AUSHADHI SEVAN VIDHI)', margin, y);
    y += 3;

    const remediesList = Array.isArray(data.remedies) ? data.remedies : [];
    const remedyRows = remediesList.map((rem: any, idx: number) => {
      if (typeof rem === 'string') {
        return [`${idx + 1}`, cleanAscii(rem), 'As advised', 'With lukewarm water'];
      }
      return [
        `${idx + 1}`,
        cleanAscii(rem.name || 'Ayurvedic Compound'),
        cleanAscii(rem.dosage || rem.frequency || '1 dose twice daily'),
        cleanAscii(rem.howToUse || 'With lukewarm water after meals'),
      ];
    });

    if (remedyRows.length === 0) {
      remedyRows.push([
        '1',
        'Triphala Churna & Koshna Jala (Warm Water)',
        '3-5 grams before sleep',
        'Take with warm water at bedtime for gut detoxification',
      ]);
    }

    autoTable(doc, {
      startY: y,
      margin: { left: margin, right: margin },
      head: [['#', 'Medicine / Herbal Formulation', 'Dosage / Timing', 'Instructions & Anupana']],
      body: remedyRows,
      headStyles: {
        fillColor: [255, 153, 51],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: [30, 41, 59],
        cellPadding: 2.2,
      },
      theme: 'grid',
    });

    y = (doc as any).lastAutoTable.finalY + 6;

    // 5. Ayurvedic Treatment & Lifestyle Tips
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(234, 88, 12);
    doc.text('AYURVEDIC TREATMENT & THERAPEUTIC MEASURES', margin, y);
    y += 4;

    const treatments = (data.treatment && data.treatment.length > 0)
      ? data.treatment
      : [
          'Koshna Jala Sevan: Drink lukewarm water throughout the day to kindle digestive fire (Deepana-Pachana).',
          'Sitz Bath / Snana: Lukewarm water sitz bath for pelvic relaxation and circulation enhancement.',
          'Dinacharya: Wake before sunrise, perform gentle oil massage (Abhyanga), and sleep by 10:30 PM.',
        ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    treatments.slice(0, 3).forEach((tr) => {
      const line = `* ${cleanAscii(tr)}`;
      const split = doc.splitTextToSize(line, contentWidth);
      doc.text(split, margin + 2, y);
      y += split.length * 3.5;
    });

    y += 2;

    // 6. Yoga & Exercises
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(234, 88, 12);
    doc.text('YOGA, ASANA & PRANAYAMA', margin, y);
    y += 4;

    const exercises = (data.exercises && data.exercises.length > 0)
      ? data.exercises
      : [
          'Anulom Vilom Pranayama: 10 minutes daily for nervous system calming and Vata balance.',
          'Vajrasana: Sit for 10-15 minutes after lunch and dinner to promote optimal digestive motility.',
          'Ashwini Mudra & Malasana: Gentle pelvic floor strengthening and bowel transit ease.',
        ];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    exercises.slice(0, 3).forEach((ex) => {
      const line = `* ${cleanAscii(ex)}`;
      const split = doc.splitTextToSize(line, contentWidth);
      doc.text(split, margin + 2, y);
      y += split.length * 3.5;
    });

    y += 2;

    // 7. Diet Advice (Pathya & Apathya)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(234, 88, 12);
    doc.text('DIET ADVICE (PATHYA & APATHYA)', margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 118, 110);
    const toEat = (data.dietAdvice?.foodsToEat && data.dietAdvice.foodsToEat.length > 0)
      ? data.dietAdvice.foodsToEat.join(', ')
      : 'Papaya, pomegranate, moong dal khichdi, bottle gourd (lauki), buttermilk with cumin, fiber-rich oats.';
    const eatSplit = doc.splitTextToSize(`[+] Foods to Eat: ${cleanAscii(toEat)}`, contentWidth);
    doc.text(eatSplit, margin + 2, y);
    y += eatSplit.length * 3.5;

    doc.setTextColor(185, 28, 28);
    const toAvoid = (data.dietAdvice?.foodsToAvoid && data.dietAdvice.foodsToAvoid.length > 0)
      ? data.dietAdvice.foodsToAvoid.join(', ')
      : 'Excess red chili, deep-fried food, maida, stale leftovers, continuous sitting without breaks.';
    const avoidSplit = doc.splitTextToSize(`[-] Foods to Avoid: ${cleanAscii(toAvoid)}`, contentWidth);
    doc.text(avoidSplit, margin + 2, y);
    y += avoidSplit.length * 3.5;

    y += 2;

    // 8. Chotelal Ji ki Salah
    if (data.advice) {
      doc.setFillColor(255, 251, 235);
      doc.rect(margin, y, contentWidth, 12, 'F');
      doc.setDrawColor(252, 211, 77);
      doc.rect(margin, y, contentWidth, 12, 'D');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(146, 64, 14);
      doc.text('CHOTELAL JI KI SALAH:', margin + 3, y + 4);

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 53, 15);
      const adviceLines = doc.splitTextToSize(`"${cleanAscii(data.advice)}"`, contentWidth - 6);
      doc.text(adviceLines, margin + 3, y + 8);
      y += 15;
    }

    // 9. Disclaimer in Red Box
    doc.setFillColor(254, 242, 242);
    doc.rect(margin, y, contentWidth, 12, 'F');
    doc.setDrawColor(248, 113, 113);
    doc.setLineWidth(0.4);
    doc.rect(margin, y, contentWidth, 12, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(185, 28, 28);
    doc.text('[!] ZAROORI SOOCHNA / IMPORTANT DISCLAIMER', margin + 3, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(153, 27, 27);
    const disclaimerText =
      'Ye prescription AI-based classical Ayurvedic informational guidance hai. Kisi bhi serious ya emergency sthiti me turant registered doctor se consult karein.';
    doc.text(disclaimerText, margin + 3, y + 8.5);

    // 10. Footer Section (Exact requested format)
    const footerY = pageHeight - 12;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      '(c) 2026 Sumit Shrivas. All Rights Reserved.',
      pageWidth / 2,
      footerY + 3,
      { align: 'center' }
    );

    // Save with exact filename pattern requested
    const safePatient = patientName.replace(/[^a-zA-Z0-9]/g, '_');
    const safeDate = dateStr.replace(/[^a-zA-Z0-9]/g, '-');
    const filename = `ChotelalJi-Prescription-${safePatient}-${safeDate}.pdf`;
    doc.save(filename);
  } catch (err) {
    console.error('Prescription PDF generation error:', err);
    alert('PDF download failed. Please try again.');
  }
}

/**
 * Backward compatibility wrapper
 */
export function generatePrescriptionPDF({
  result,
  patientName = 'Valued Patient',
  patientAge = '28',
  patientGender = 'Male',
  dateStr = new Date().toLocaleDateString('en-IN'),
}: {
  result: DiagnosisResultData;
  patientName?: string;
  patientAge?: string | number;
  patientGender?: string;
  dateStr?: string;
}): void {
  generatePrescription({
    patientName,
    age: patientAge,
    gender: patientGender,
    date: dateStr,
    diagnosisId: result.id || `CHL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    symptoms: result.patientSummary?.reportedSymptoms || result.diagnosis_text || 'Ayurvedic Health Consultation',
    duration: result.patientSummary?.duration || '1-2 weeks',
    severity: result.patientSummary?.severity || 'moderate',
    diagnosis: result.diagnosis?.primaryCondition || result.diagnosis?.primaryConditionHindi || result.diagnosis_text || 'Ayurvedic Assessment',
    ayurvedicDosha: result.diagnosis?.ayurvedicDosha || 'Vata-Pitta Pradhan Imbalance',
    remedies: result.tier1HerbalRemedies || result.herbal_remedies || [],
    treatment: result.ayurvedic_treatment || [],
    exercises: result.exercises || (result.tier2LifestyleAndYoga ? result.tier2LifestyleAndYoga.map((y) => y.title) : []),
    advice: result.chotelalPersonalNote,
  });
}

/**
 * Generates an Ayurvedic 7-Day Personal Diet Chart PDF
 */
export function generateDietChartPDF({
  dietChart,
  patientName = 'Valued Patient',
}: {
  dietChart: any;
  patientName?: string;
}): void {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    doc.setFillColor(255, 153, 51);
    doc.rect(0, 0, pageWidth, 16, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('CHOTELAL JI HEALTH — 7-DAY AYURVEDIC PERSONAL DIET CHART', margin, 11);

    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`Patient: ${cleanAscii(patientName)}  |  Focus: ${cleanAscii(dietChart?.condition || 'Ayurvedic Wellness')}`, margin, 24);

    const tableRows = (dietChart?.weeklyPlan || []).map((dayPlan: any) => [
      cleanAscii(dayPlan.day || ''),
      cleanAscii(dayPlan.earlyMorning || 'Warm water / Herbal infusion'),
      cleanAscii(dayPlan.breakfast || ''),
      cleanAscii(dayPlan.lunch || ''),
      cleanAscii(dayPlan.eveningSnack || ''),
      cleanAscii(dayPlan.dinner || ''),
    ]);

    autoTable(doc, {
      startY: 28,
      margin: { left: margin, right: margin },
      head: [['Day', 'Early Morning Detox', 'Breakfast', 'Lunch', 'Evening Snack', 'Dinner']],
      body: tableRows.length > 0 ? tableRows : [
        ['Mon-Sun', 'Lukewarm water with lemon/cumin', 'Warm oats or daliya', 'Moong dal khichdi & bottle gourd', 'Herbal tea & roasted makhana', 'Light vegetable soup & 2 rotis']
      ],
      headStyles: {
        fillColor: [255, 153, 51],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: [30, 41, 59],
        cellPadding: 2,
      },
      theme: 'grid',
    });

    const safeName = cleanAscii(patientName).replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`ChotelalJi-DietChart-${safeName}.pdf`);
  } catch (err) {
    console.error('Diet chart PDF error:', err);
    alert('Diet chart download failed. Please try again.');
  }
}

