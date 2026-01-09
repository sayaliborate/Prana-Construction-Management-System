from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import CompanyInfo, TeamMember, Service, ContactMessage
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm, SelectableFieldsExportForm

@admin.register(CompanyInfo)
class CompanyInfoAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'email', 'phone', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'email', 'phone']
    ordering = ['name']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'position', 'email', 'phone', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'position', 'email']
    ordering = ['order']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(Service)
class ServiceAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'icon', 'featured', 'order']
    list_filter = ['featured', 'icon']
    search_fields = ['name', 'description']
    ordering = ['order']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    import_form_class = ImportForm
    export_form_class = ExportForm