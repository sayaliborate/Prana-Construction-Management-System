from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Supplier, Material, PurchaseOrder, PurchaseOrderItem, StockTransaction
from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm, SelectableFieldsExportForm

@admin.register(Supplier)
class SupplierAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'contact_person', 'email', 'phone', 'is_active']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'email', 'phone']
    ordering = ['name']
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(Material)
class MaterialAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['name', 'category', 'unit', 'unit_price', 'current_stock', 'minimum_stock', 'supplier']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'category']
    ordering = ['name']
    import_form_class = ImportForm
    export_form_class = ExportForm

class PurchaseOrderItemInline(admin.TabularInline):
    model = PurchaseOrderItem
    extra = 0

@admin.register(PurchaseOrder)
class PurchaseOrderAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['po_number', 'supplier', 'order_date', 'status', 'total_amount']
    list_filter = ['status', 'order_date']
    search_fields = ['po_number', 'supplier__name']
    ordering = ['-order_date']
    inlines = [PurchaseOrderItemInline]
    import_form_class = ImportForm
    export_form_class = ExportForm

@admin.register(StockTransaction)
class StockTransactionAdmin(ModelAdmin,ImportExportModelAdmin):
    list_display = ['material', 'transaction_type', 'quantity', 'transaction_date', 'created_by']
    list_filter = ['transaction_type', 'transaction_date']
    search_fields = ['material__name', 'reference_number']
    ordering = ['-transaction_date']
    import_form_class = ImportForm
    export_form_class = ExportForm
