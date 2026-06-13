from django.core.management.base import BaseCommand

from apps.core.content_audit import scan_database, scan_files


class Command(BaseCommand):
    help = 'Scan site content files and database for forbidden terminology'

    def handle(self, *args, **options):
        file_findings = scan_files()
        db_findings = scan_database()
        all_findings = file_findings + db_findings

        if not all_findings:
            self.stdout.write(self.style.SUCCESS('No forbidden content terms found.'))
            return

        self.stdout.write(self.style.ERROR(f'Found {len(all_findings)} forbidden term(s):'))
        for item in all_findings:
            self.stdout.write(
                f'  [{item["term"]}] {item["source"]}: ...{item["snippet"]}...'
            )
        raise SystemExit(1)
