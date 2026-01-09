from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Client, Invoice, Billing, BillingItem
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm, SelectableFieldsExportForm


class BillingItemInline(admin.TabularInline):
    model = BillingItem
    extra = 0

@admin.register(Client)
class ClientAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'client_type', 'email', 'phone', 'company_name', 'is_active']
    list_filter = ['client_type', 'is_active', 'created_at']
    search_fields = ['name', 'email', 'phone', 'company_name']
    ordering = ['name']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(Invoice)
class InvoiceAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['invoice_number', 'project', 'client', 'total_amount', 'status', 'due_date']
    list_filter = ['status', 'created_at', 'due_date']
    search_fields = ['invoice_number', 'client__name', 'project__name']
    ordering = ['-created_at']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(Billing)
class BillingAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['invoice_number', 'client', 'invoice_date', 'total_amount', 'status']
    list_filter = ['status', 'invoice_date', 'due_date']
    search_fields = ['invoice_number', 'client__name']
    ordering = ['-invoice_date']
    inlines = [BillingItemInline]
    import_form_class = ImportForm
    export_form_class = ExportForm
