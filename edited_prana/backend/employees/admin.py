from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Supervisor, Labour, SalarySlip
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm, SelectableFieldsExportForm


@admin.register(Supervisor)
class SupervisorAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'email', 'phone', 'designation', 'experience_years', 'is_active']
    list_filter = ['designation', 'is_active', 'created_at']
    search_fields = ['name', 'email', 'phone']
    ordering = ['name']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(Labour)
class LabourAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'work_type', 'daily_wage', 'monthly_salary', 'is_active']
    list_filter = ['work_type', 'is_active', 'created_at']
    search_fields = ['name', 'email', 'phone']
    ordering = ['name']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(SalarySlip)
class SalarySlipAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['labour', 'month', 'year', 'net_salary', 'is_paid', 'generated_date']
    list_filter = ['month', 'year', 'is_paid']
    search_fields = ['labour__name']
    ordering = ['-year', '-month']
    import_form_class = ImportForm
    export_form_class = ExportForm
