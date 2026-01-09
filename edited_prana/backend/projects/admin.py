from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import SiteDetail, Project, ProjectImage, SitePlan, SiteTracker
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm, SelectableFieldsExportForm

@admin.register(SiteDetail)
class SiteDetailAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['title', 'region', 'category', 'team_leader', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'region', 'description']
    ordering = ['-created_at']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(Project)
class ProjectAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'site', 'client', 'status', 'progress', 'budget', 'created_at']
    list_filter = ['status', 'created_at', 'featured']
    search_fields = ['name', 'description']
    ordering = ['-created_at']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(ProjectImage)
class ProjectImageAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['project', 'caption', 'is_before', 'is_after', 'order']
    list_filter = ['is_before', 'is_after']
    ordering = ['order']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(SitePlan)
class SitePlanAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['site', 'plan_name', 'plan_type', 'version', 'is_current', 'uploaded_at']
    list_filter = ['plan_type', 'is_current']
    ordering = ['-uploaded_at']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(SiteTracker)
class SiteTrackerAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['site', 'supervisor', 'date', 'progress_percentage', 'expenses']
    list_filter = ['date', 'progress_percentage']
    ordering = ['-date']
    import_form_class = ImportForm
    export_form_class = ExportForm
