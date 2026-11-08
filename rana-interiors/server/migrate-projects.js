import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { supabase } from './supabase.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrateProjects() {
  try {
    const dbPath = path.join(__dirname, 'data', 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    for (const project of db.projects || []) {
      const imageName = path.basename(project.image);
      const imagePath = path.join(__dirname, 'uploads', imageName);

      if (!fs.existsSync(imagePath)) {
        console.log('Image missing:', imageName);
        continue;
      }

      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('title', project.title)
        .eq('location', project.location)
        .limit(1);

      if (existing?.length) {
        console.log('Already migrated:', project.title);
        continue;
      }

      const buffer = fs.readFileSync(imagePath);
      const fileName = `${Date.now()}-${imageName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, buffer, {
          contentType: 'image/png',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: imageData } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      const { error } = await supabase.from('projects').insert({
        title: project.title,
        category: project.category,
        location: project.location,
        description: project.description,
        image_url: imageData.publicUrl,
      });

      if (error) throw error;

      console.log('Migrated successfully:', project.title);
    }
  } catch (error) {
    console.error('Migration failed:', error.message);
  }
}

migrateProjects();